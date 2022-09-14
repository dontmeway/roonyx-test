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

export const BASE_URL = 'https://rickandmortyapi.com/api'

const fetchAllEpisodes = async (): Promise<Episode[]> => {
  try {
    const url = `${BASE_URL}/episode`

    const firstPageData = await fetchEpisodes(url)

    const allEpisodes = await Promise.all(
      Array.from({ length: firstPageData.info.pages - 1 }).flatMap((_, idx) =>
        fetchEpisodes(url + `?page=${idx + 2}`)
      )
    )

    return firstPageData.results.concat(
      allEpisodes.flatMap(({ results }) => results)
    )
  } catch (error) {
    throw Error('Smth went wrong!')
  }
}

const fetchEpisodes = async (
  url: string
): Promise<FetchAllEpisodesRequestAnswer> => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    throw Error('Smth went wrong!')
  }
}

const fetchCharacters = async (url: string): Promise<Character[]> => {
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

  const charactersUrl = episodes.flatMap((episode) => episode.characters)

  const uniqueCharactersUrls = new Set(charactersUrl)
  const charactersIds = Array.from(uniqueCharactersUrls)
    .map(getIdFromUrl)
    .join(',')

  const characters = await fetchCharacters(
    `${BASE_URL}/character/${charactersIds}`
  )

  const charactersDict = characters.reduce<Record<number, Character>>(
    (acc, next) => {
      acc[next.id] = next
      return acc
    },
    {}
  )

  const result = episodes.map((episode) => {
    const characters = episode.characters.map((characterUrl) => {
      const characterId = getIdFromUrl(characterUrl)
      return charactersDict[+characterId]
    })

    return { ...episode, characters }
  })

  console.log(result)
}

log()

function getIdFromUrl(url: string) {
  const matched = url.match(/\d+/g)
  if (matched) return matched[0]

  return ''
}
