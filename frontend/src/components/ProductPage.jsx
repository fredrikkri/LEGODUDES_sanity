import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductsBySlug, updateReview } from '../../sanity/services/productServices'
import { Link } from "react-router-dom"

export default function ProductPage() {
    // states for å lagre skjemainformasjon.
    const [reviewer, setReviewer] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [forMessage, setForMessage] = useState("")

// handleChange funksjoner for felter.
const handleReviewerChange = (e) => {
    e.preventDefault()
    setReviewer(e.target.value)
}
const handleCommentChange = (e) => {
    e.preventDefault()
    setComment(e.target.value)
}
const handleRatingChange = (e) => {
    e.preventDefault() 
    setRating(Number(e.target.value))
} 
// handleSubmit-funksjon for når en bruker sender en anmeldelse
const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) {
        setForMessage("Du må sette en vurdering.")
    } else {
        const result = await updateReview(product._id, reviewer, comment, rating)
        if(result == "Success") {
            setForMessage("Din anmeldelse er registrert!")
            product.reviews.push({reviewer: reviewer, comment: comment, rating: rating})
        } else {
            setForMessage(result)
        }
        console.log(result)
    }
}

    const {slug} = useParams()
    const [product, setProduct] = useState(null)

    const getProductBySlug = async (slug) => {
        const data = await fetchProductsBySlug(slug)
        setProduct(data[0])
    }

    useEffect(()=>{
        getProductBySlug(slug)
    }, [slug])

    console.log("Products",product)

    if(product) {
        return (
            <main id='productpage'>
                <figure>
                    <img src={product?.image} alt={`Produktbilde av LEGO-figuren ${product?.productname}`} />
                </figure>
                <article>
                    <h2>{product?.productname}</h2>
                    <p className='metainfo'>
                        <Link to={"/produkter/" + product?.catslug}>{product?.categoryname}</Link>
                        <span className='stockcount'>{product?.stock === 0 ? "Tomt" : product?.stock} på lager</span>
                    </p>
                    <p>{product?.description}</p>
                    <p className='priceview'>Kr. {product?.price}</p>
                    <h3>Anmeldelser:</h3>
                    <form>
                        <p>
                            <label htmlFor="reviewer">Ditt navn:</label><br />
                            <input name="reviewer" id="reviewer" onChange={handleReviewerChange} type="text" />
                        </p>
                        <p>
                            <label htmlFor='comment'>Kommentar:</label><br />
                            <textarea name="comment" onChange={handleCommentChange} id="comment"></textarea>
                        </p>
                        <p>
                            <label htmlFor="rating">Vurdering:</label><br />
                            <select name="rating" id="rating" required onChange={handleRatingChange}>
                                <option value="">Velg din vurdering</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </p>
                        <p id='formessage'>{forMessage}</p>
                        <p><button onClick={handleSubmit}>Send anmeldelse</button></p>
                    </form>
                    {
                        product?.reviews?.map((r, i) => <p key={i}>
                            <strong>{r.reviewer}</strong><br />
                            {r.comment}<br />
                            Vurdering: {r.rating}
                        </p>)
                    }
                </article>
            </main> 
        )
    } else {
        return (
            <main>
                <p>Laster produktinfo...</p>
            </main>
        )
    }
}