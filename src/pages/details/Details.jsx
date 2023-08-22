import React from 'react'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'

function Details() {
  // const { mediaType, id } = useParams();
  // console.log(mediaType,"hhh",id)
  // const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  // const { data: credits, loading: creditsLoading } = useFetch(
  //     `/${mediaType}/${id}/credits`
  // );

  
  return (
    <DetailsBanner />
  )
}

export default Details