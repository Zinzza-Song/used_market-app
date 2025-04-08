import getProducts, { ProductsParams } from '@/serverActions/getProducts'

interface HomeProps {
  searchParams: ProductsParams
}

export default async function Home({ searchParams }: HomeProps) {
  console.log('searchParmas', searchParams)
  const products = await getProducts(searchParams)
  console.log('상품들', products)

  return <main>누구나 볼 수 있는 페이지</main>
}
