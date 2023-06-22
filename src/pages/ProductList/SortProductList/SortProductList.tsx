import React from 'react'
import { QueryConfig } from '../ProductList'
import { sortBy, order as orderConstant } from 'src/constant/product'
import classNames from 'classnames'
import { ProductListConfig } from 'src/types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constant/path'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiceSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handerSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit({
          ...queryConfig,
          sort_by: sortByValue
        })
      ).toString()
    })
  }

  const handerPriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'hover: bg-orange bg-orange/80 text-white': isActiceSortBy(sortBy.view),
              'hover: bg-slate-100 bg-white text-black': !isActiceSortBy(sortBy.view)
            })}
            onClick={() => handerSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'hover: bg-orange bg-orange/80 text-white': isActiceSortBy(sortBy.createdAt),
              'hover: bg-slate-100 bg-white text-black': !isActiceSortBy(sortBy.createdAt)
            })}
            onClick={() => handerSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'hover: bg-orange bg-orange/80 text-white': isActiceSortBy(sortBy.sold),
              'hover: bg-slate-100 bg-white text-black': !isActiceSortBy(sortBy.sold)
            })}
            onClick={() => handerSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8 px-4 text-left text-sm capitalize outline-none ', {
              ' bg-orange  text-white hover:bg-orange/80': isActiceSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100 ': !isActiceSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(even) => handerPriceOrder(even.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex-items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2'>
            {page === 1 ? (
              <span className=' flex h-8 w-9 items-center justify-center rounded-br-sm rounded-tr-sm  bg-white  hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className=' flex h-8 w-9 items-center justify-center rounded-br-sm rounded-tr-sm  bg-white  hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

{page === pageSize ? (
              <span className=' flex h-8 w-9 items-center justify-center rounded-br-sm rounded-tr-sm  bg-white  hover:bg-slate-100'>
                <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className=' flex h-8 w-9 items-center justify-center rounded-br-sm rounded-tr-sm  bg-white  hover:bg-slate-100'
              >
                <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
              </Link>
            )}

           
          </div>
        </div>
      </div>
    </div>
  )
}
