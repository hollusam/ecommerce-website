import Head from 'next/head'
import prisma from 'lib/prisma'
import { getProducts } from 'lib/data.js'
import Image from 'next/image'

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Shop</title>
        <meta name='description' content='Shop' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className=' '>
        <h1 className='mt-10 font-extrabold text-4xl text-center'>Shop</h1>
        <div className='mt-20 mx-auto max-w-sm'>
          {products.map((product) => (
            <div className='mb-4 grid sm:grid-cols-2' key={product.id}>
              <div>
                <Image src={`/` + product.image} width={'600'} height={'600'} />
              </div>
              <div className='sm:ml-10 mb-20 sm:mb-0'>
                <h2 className='text-3xl font-extrabold'>{product.title}</h2>
                <h3 className='text-2xl font-extrabold mb-4'>
                  ${product.price / 100}
                </h3>
                <p className='text-xl'>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const products = await getProducts(prisma)

  return {
    props: {
      products,
    },
  }
}