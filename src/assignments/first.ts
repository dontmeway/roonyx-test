/* 
HTTP Request Handling 
    Write down code snippet using following requirements: 
    - Use only vanilla TypeScript, without additional libraries. 
    - Use REST Rick and Morty API for this assignment. 
    - Request all episodes using API. 
    - Replace URLs in “characters” array with character JSON objects taken from API. 
    - Log final array into console. 
*/

type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

type Character = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

type FetchAllEpisodesRequestAnswer = {
  info: {
    count: number
    pages: number
    next: null | string
    prev: null | string
  }
  results: Episode[]
}

type FetchCharacterRequestAnswer = {}

export const BASE_URL = 'https://rickandmortyapi.com/api'

const fetchAllEpisodes = async (): Promise<FetchAllEpisodesRequestAnswer> => {
  try {
    const url = `${BASE_URL}/episode`

    const response = await fetch(url)
    const data = await response.json()

    return data
  } catch (error) {
    throw Error('Smth went wrong!')
  }
}

const fetchCharacter = async (url: string): Promise<Character> => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    throw Error('Smth went wrong!')
  }
}

const log = async () => {
  const episodes = await fetchAllEpisodes()

  const charactersUrl = episodes.results.flatMap(
    (episode) => episode.characters
  )

  const uniqueCharactersUrls = new Set(charactersUrl)

  const characters = await Promise.all(
    Array.from(uniqueCharactersUrls).map((url) => fetchCharacter(url))
  )
  console.log(characters)
}

log()
