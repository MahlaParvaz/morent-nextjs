import { getCategories } from '@/src/services/categoryService';
import { getProducts } from '@/src/services/productService';
import CategorySidebar from './CategorySidebar';
import queryString from 'query-string';
import { toLocalDateStringShort } from '@/src/utils/toLocalDate';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { toStringCookies } from '@/src/utils/toStringCookies';
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // eq to {cache :"no-store"} or SSR in pages Dir. :)

async function Products({ searchParams }) {
  // const { products } = await getProducts(queryString.stringify(searchParams));
  // const { categories } = await getCategories();
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);
  const productsPromise = getProducts(
    queryString.stringify(searchParams),
    strCookies
  );

  const categoryPromise = getCategories();
  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);
  return (
    <div className="bg-red-100 h-screen flex justify-between items-start ">
      {/* <h1 className="text-xl font-bold mb-6">صفحه محصولات</h1> */}
      <CategorySidebar categories={categories} />
      <div className="grid grid-cols-3 lg:max-w-screen-lg ">
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => {
              return (
                <div
                  className="col-span-1 border rounded-xl shadow-md p-4"
                  key={product._id}
                >
                  <h2 className="font-bold text-xl mb-4">{product.title}</h2>
                  <div>
                    <Image
                      src={product.imageLink}
                      width={500}
                      height={500}
                      alt="image doesn't show"
                    />
                  </div>
                  <div className="mb-4">
                    <span>تاریخ ساختن: </span>
                    <span className="font-bold">
                      {toLocalDateStringShort(product.createdAt)}
                    </span>
                  </div>
                  <Link
                    className="text-primary-900 font-bold mb-4 block"
                    href={`/products/${product.slug}`}
                  >
                    مشاهده محصول
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
