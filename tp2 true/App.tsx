import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Button,
} from 'react-native';
import styles from './styles';

interface Pokemon {
  name: string;
  url: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50';

export default function App() {
  const [dataCache, setDataCache] = useState<Record<string, Pokemon[]>>({});
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredText, setFilteredText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>(INITIAL_URL);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  // Cargar página (usando cache si existe)
  const fetchPokemons = useCallback(
    async (url: string, useCache = true) => {
      try {
        setError(null);
        setLoading(!refreshing);
        if (useCache && dataCache[url]) {
          setPokemons(dataCache[url]);
          return;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al cargar los datos');

        const data: ApiResponse = await response.json();
        setPokemons(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);

        setDataCache((prev) => ({ ...prev, [url]: data.results }));
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [dataCache, refreshing]
  );

  // Inicial
  useEffect(() => {
    fetchPokemons(currentUrl);
  }, [currentUrl, fetchPokemons]);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPokemons(currentUrl, false); // Forzar refetch
  }, [currentUrl, fetchPokemons]);

  // Filtrado optimizado
  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filteredText.toLowerCase())
    );
  }, [pokemons, filteredText]);

  // Render
  const renderItem = ({ item }: { item: Pokemon }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  // Cargando
  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#2196f3" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Filtro */}
      <TextInput
        style={styles.input}
        placeholder="Filtrar por nombre..."
        value={filteredText}
        onChangeText={setFilteredText}
        placeholderTextColor="#888"
      />

      {/* Error */}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.errorText}>Desliza hacia abajo para reintentar.</Text>
        </View>
      )}

      {/* Lista */}
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.noResults}>No se encontraron resultados.</Text>
          </View>
        }
        keyboardShouldPersistTaps="handled"
      />

      {/* Controles de paginación */}
        <View style={styles.pagination}>
          <View style={styles.button}>
            <Button
              title="Inicio"
              onPress={() => setCurrentUrl(INITIAL_URL)}
              disabled={currentUrl === INITIAL_URL}
              color="#2196f3"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Anterior"
              onPress={() => prevUrl && setCurrentUrl(prevUrl)}
              disabled={!prevUrl}
              color="#2196f3"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Siguiente"
              onPress={() => nextUrl && setCurrentUrl(nextUrl)}
              disabled={!nextUrl}
              color="#2196f3"
            />
          </View>
        </View>

    </SafeAreaView>
  );
}
