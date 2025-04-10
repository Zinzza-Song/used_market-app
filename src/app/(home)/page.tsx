import Categories from '@/components/categories/Categories'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import FloatingButton from '@/components/FloatingButton'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/products/ProductCard'
import { PRODUCT_PER_PAGE } from '@/constants'
import getCurrentUser from '@/serverActions/getCurrentUser'
import getProducts, { ProductsParams } from '@/serverActions/getProducts'

export default async function Home({
  searchParams
}: {
  searchParams: Promise<ProductsParams>
}) {
  const { page, skip } = await searchParams
  const pageNum = typeof page === 'string' ? Number(page) : 1
  const skipNum = typeof skip === 'string' ? Number(skip) : 1

  const products = await getProducts(searchParams)

  const currentUser = await getCurrentUser()

  return (
    <Container>
      {/* Category */}
      <Categories />

      {
        /* EmptyState */
        products?.data.length === 0 ? (
          <EmptyState showReset />
        ) : (
          <div className="grid-col-1 md:gird-cols-3 grid h-full gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
            {products.data.map(product => (
              <ProductCard
                currentUser={currentUser}
                key={product.id}
                data={product}
              />
            ))}
          </div>
        )
      }

      {/* Pagination */}
      <Pagination
        page={pageNum}
        totalItems={products.totalItems}
        perPage={PRODUCT_PER_PAGE}
      />

      {/* FloatingButton */}
      <FloatingButton href="/products/upload">+</FloatingButton>
    </Container>
  )
}
