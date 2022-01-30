class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=a93d7aa5099d0fe46274896e497f7166'
  getResource = async (url) => {
    let res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
    return this._transformCharacter(res.data.results[0])
  }

  _transformCharacter = (char) => {
    if (char.description === '') {
      char.description = 'Sorry, there is no information on this character'
    } else if (char.description.length >= 200) {
      char.description = char.description.slice(0, 200) + '...'
    }


    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    }
  }
}

export default MarvelService;