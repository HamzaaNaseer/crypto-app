import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetNewsQuery } from '../services/newsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'


const { Text, Title } = Typography
const { Option } = Select
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
const News = ({ simplified }) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

  const { data: cryptoNews } = useGetNewsQuery({ newsCategory, count: simplified ? 6 : 12 })
  const { data } = useGetCryptosQuery(100)

  console.log(cryptoNews)
  if (!cryptoNews?.value) return <Loader/>
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='select a crypto'
            optionFilterProp='children'
            onChange={(val) => { setNewsCategory(val) }}
            filterOption={(input, option) => option.children.toLowerCase().indexof(input.toLocaleLowerCase()) >= 0}
          >

            <Option Value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins?.map((coin)=>(<Option value={coin.name}>{coin.name}</Option>))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((singleNews, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={singleNews.url} target='_blank' rel='noreferrer'>
              <div className="news-image-container">
                <Title className='news-title' level={4}> {singleNews.name}</Title>
                <img style={{ 'maxWidth': '200px', 'maxHeight': '100px' }} src={singleNews?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
              </div>
              <p>
                {
                  singleNews.description > 100 ? `${singleNews.description.substring(0, 100)}...` : singleNews.description
                }
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={singleNews.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='' />
                  <Text className='provider-name'>{singleNews.provider[0]?.name}</Text>
                </div>
                <Text>{moment(singleNews.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}

    </Row>
  )
}

export default News