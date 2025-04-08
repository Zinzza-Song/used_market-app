import Categories from '@/components/categories/Categories'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import FloatingButton from '@/components/FloatingButton'
import ProductCard from '@/components/ProductCard'
import getCurrentUser from '@/serverActions/getCurrentUser'
import getProducts, { ProductsParams } from '@/serverActions/getProducts'

export default async function Home({
  searchParams
}: {
  searchParams: Promise<ProductsParams>
}) {
  const products = await getProducts(searchParams)
  const currentUser = await getCurrentUser()

  return (
    <Container>
      {/* Category */}
      <Categories />

      {products?.data.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <>
          <div className="grid-col-1 md:gird-cols-3 grid gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
            {products.data.map(product => (
              <ProductCard
                currentUser={currentUser}
                key={product.id}
                data={product}
              />
            ))}
          </div>
        </>
      )}

      <FloatingButton href="/products/upload">+</FloatingButton>
    </Container>
  )
}
