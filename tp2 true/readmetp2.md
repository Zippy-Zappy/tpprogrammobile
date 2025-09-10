1. fetchPokemons
   const fetchPokemons = useCallback(async () => { ... });


Llama a la API de Pokémon.

Guarda los resultados en pokemons.

Maneja errores y estados loading y refreshing.

2. useEffect
   useEffect(() => {
   fetchPokemons();
   }, [fetchPokemons]);


Ejecuta la función fetchPokemons al montar el componente.

3. useMemo
   const filteredPokemons = useMemo(() => {
   return pokemons.filter(pokemon =>
   pokemon.name.toLowerCase().includes(filteredText.toLowerCase())
   );
   }, [pokemons, filteredText]);


Filtra la lista en memoria de forma eficiente.

Solo se recalcula cuando cambian pokemons o filteredText.

4. onRefresh
   const onRefresh = useCallback(() => {
   setRefreshing(true);
   fetchPokemons();
   }, [fetchPokemons]);


Se ejecuta cuando el usuario hace "pull-to-refresh".

Mantiene el filtro actual (filteredText).


Paginación	Se usa next y previous de la API.
Filtro	Se aplica sobre la página actual (client-side).
Cache por página	Usamos un objeto { [url]: Pokemon[] } para evitar refetch innecesario.
Sin resultados	Se muestra si el filtro no encuentra coincidencias.