import React, { useEffect, useState } from 'react'
import AsideFilter from './AsideFilter'
import { Omit, isUndefined, omitBy } from 'lodash'
import SortProductList from './SortProductList'
import Product from './Product/Product'
import { useQuery } from '@tanstack/react-query'
import usequeryparams from 'src/hook/useQueryParams'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination/Pagination'
import { ProductListConfig } from 'src/types/product.type'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function ProductList() {
  const queryParams: QueryConfig = usequeryparams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )
  // const [page, setPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['Product', queryParams],
    queryFn: () => {
      return productApi.getProduct(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })
  console.log(data)
  return (
    <div className='bg-gray-200 py-2'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-9 gap-3'>
            <div className='col span-3'>
              <AsideFilter />
            </div>
            <div className=' col-span-7 py-5'>
              <SortProductList queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
              <div className='lg-grid-cols-6 xl:gr-cols-7 mt-6 grid grid-cols-2 gap-3 md:grid-cols-5'>
                {data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
