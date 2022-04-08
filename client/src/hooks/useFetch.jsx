import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API

const useFetch = ({keyword}) => {
      const [gifurl,setGifUrl] = useState('')
      const fetchGifs = async () =>{
            try {
                  const response = await fetch(`https://api.gifphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`)

                  const { data } = await response.json()
                  setGifUrl(data[0]?.images?.downsized_medium?.url)
            } catch (error) {
                  setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284')
            }
      }
      useEffect(() => {
            if(keyword) fetchGifs()
      },[keyword])

      return gifurl
      
}
export default useFetch