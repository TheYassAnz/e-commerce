import { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Products() {
    const { filter } = useParams()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])
    useEffect(() => {
        setIsLoading(true)
        axios
            .get('http://localhost:8000/category')
            .then((res) => {
                console.log(res.data)
                setCategories(res.data)
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
        axios
            .get('http://localhost:8000/products')
            .then((response) => {
                setIsLoading(false)
                console.log(filter)
                console.log(response.data)
                if (filter != 'all-products') {
                    categories.map((category) => {
                        if (category.name.toLowerCase() === filter) {
                            setProducts(
                                response.data.filter(
                                    (product) =>
                                        product.category === category._id
                                )
                            )
                        }
                    })
                } else {
                    setProducts(response.data)
                }
            })
            .catch((error) => console.error(error))
    }, [filter])
    return (
        <div className="mx-10">
            <SideBar title="All products">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        products.map((product, index) => (
                            <div
                                key={`${index}-${product.id}`}
                                className="group relative"
                            >
                                <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={
                                            product.image
                                                ? product.image
                                                : `https://placehold.it/300x300?text=`
                                        }
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link
                                                to={`/shop/products/${product.id}`}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-0"
                                                />
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {product.description}
                                        </p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {product.price}€
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </SideBar>
        </div>
    )
}