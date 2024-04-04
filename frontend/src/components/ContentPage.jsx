import Title from './Title'
import ProductCard from './ProductCard'
import {products} from '../assets/legoduds'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchCategoryBySlug } from '../../sanity/services/categoryServices'
export default function ContentPage({amount, setAmount, category, setCart, cart}){
  const {slug} = useParams()
  const [catInfo, setCatInfo] = useState(null)

  const getCategoriesBySlug = async (slug) => {
    const data = await fetchCategoryBySlug(slug)
    setCatInfo(data)
  } 

useEffect(() => {
  getCategoriesBySlug(slug)
}, [slug])

    return(
        <main>
          <Title category={catInfo?.categorytitle} />
          {/* {products.map(product => 
          <ProductCard
          cart={cart} 
          setCart={setCart}
          prodid={product.prodid}
          key={product.prodid} 
          category={product.category} 
          title={product.title} 
          img={product.imagefile} 
          price={product.price}
          amount={amount}
          setAmount={setAmount}
          /> )} */}
        </main>
    )
}