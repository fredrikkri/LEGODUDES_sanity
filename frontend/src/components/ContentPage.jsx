import Title from './Title'
import ProductCard from './ProductCard'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchCategoryBySlug } from '../../sanity/services/categoryServices'
export default function ContentPage({amount, setAmount, category, setCart, cart}){
  const {slug} = useParams()
  const [catInfo, setCatInfo] = useState(null)

  const getCategoriesBySlug = async (slug) => {
    const data = await fetchCategoryBySlug(slug)
    setCatInfo(data[0])
  } 

useEffect(() => {
  getCategoriesBySlug(slug)
}, [slug])

    return(
        <main>
          <Title category={catInfo?.categorytitle} />
          {catInfo?.catProducts.map((product, index) => 
          <ProductCard key={index} productInfo={product} setAmount={setAmount} setCart={setCart} cart={cart}/>)}
        </main>
    )
}