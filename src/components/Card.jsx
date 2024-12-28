import { useEffect, useState } from "react"

const Card = ({id, score, card, cards, setScore, setCards, resetCards, mixCards, setRightAnswer, setAnimationKey}) => {
  const [imgUrl, setImgUrl] = useState(null);

  const fetchPokemonImage = async (id) => {
    if (id % 2) id += 2
    else if (id % 3) id += 15
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}/`);
    const data = await response.json();
    const url = data.sprites.other['official-artwork'].front_default;
    return url;
  }

  useEffect(() => {
    const getImgUrl = async () => {
      const url = await fetchPokemonImage(id);
      setImgUrl(url);
    }
    getImgUrl();
  }, [])

  return (
    <div className="card-container"onClick={() => {
      setAnimationKey(prev => prev + 1)
      if (card.clicked) {
        setScore({current: 0, highest: score.current > score.highest ? score.current : score.highest});
        setRightAnswer(false);
        setCards(resetCards());
      } else {
        if (score.current === 11) {
          setScore({current: 0, highest: 12});
          setRightAnswer(null);
          setCards(resetCards());
        } else {
          setScore({...score, current: score.current + 1});
          setRightAnswer(true);
          setCards(mixCards(id, cards));
        }
      }
    }}>
      {
        imgUrl ?  <img className="card-img" src={imgUrl} alt="" /> : <div>Loading image...</div>
      }
    </div>
  )
}

export default Card;