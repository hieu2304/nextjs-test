import React, { useState } from 'react'
import Header from './components/Header.js'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import { isEmpty, get } from 'lodash'
import Image from 'next/image'
import { Input, DatePicker, Button, Checkbox, Radio, Tag, Modal } from 'antd'
import logoDate from '.././public/logo-date.svg'
import logoTime from '.././public/logo-time.svg'
import logoAddress from '../public/logo-address.svg'
import logoCapicity from '../public/logo-maxcacipi.svg'
import logoCost from '../public/logo-cost.svg'
import logoBanner from '../public/banner.svg'
import { createSocial, getDetailSocial } from './api/home'

const { TextArea } = Input;
const arrayBanner = [
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_2.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_3.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_4.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_5.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_6.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_7.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_8.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_9.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_10.jpg',
]
const Container = styled.div`
  display: grid;
  padding: 0 112px;

  .ant-modal-body {
    max-width: 1000px !important;
  }  
`

const Content = styled.div`
  display: flex;
  margin: 64px 0 ${props => props.bottom}px;

  .right-side {
    .right-child {
      width: 739px;
      height: 445px;
      background: rgba(242, 242, 242, 0.1);
      border: 1px dashed #F2F2F2;
      border-radius: 0px 64px;
      justify-content: center;
      display: flex;
      align-items: center;


      .logo-banner-live {
        border: 1px dashed #F2F2F2;
        border-radius: 0px 64px;
      }

      .text-banner {
        color: #14597A;
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        margin-left: 16px;
        line-height: 19px;
        cursor: pointer;
      }
    }    
  }

  .left-side {
    display: flex;
    flex-direction: column;
    position: relative;

    .title {
      background: #942F70;
      padding: 4px 12px;
      color: #FFFFFF;
      max-width: 310px;
      height: 68px;
      font-weight: 700;
      font-size: 48px;
      line-height: 60px;
      margin-bottom: 28px;
    }

    .detail-title {
      background: #942F70;
      padding: 4px 12px;
      color: #FFFFFF;
      max-width: 580px;
      position: relative;
      z-index: 1;
      min-height: 287px;
      font-weight: 700;
      font-size: 48px;
      line-height: 60px;
      margin-bottom: 28px;
    }

    .date-detail {
      font-weight: 600;
      font-size: 28px;
      line-height: 40px;
    }

    .child {
      display: flex;
      flex-direction: row;
      align-items: center;
      & > *:not(:last-child) {
        margin-right: 15px;
      }

      .ant-picker-input>input::placeholder {
        color: #333333;
        font-weight: 600;
        font-family: 'Neue Haas Grotesk Display Pro';
        font-size: 20px;
      }

      .ant-input::placeholder {
        color: #333333;
        font-weight: 600;
        font-family: 'Neue Haas Grotesk Display Pro';
        font-size: 16px;
      }

      .input-child {
        color: #333333;
        font-weight: 600;
        font-family: 'Neue Haas Grotesk Display Pro';
        font-size: 28px;
        min-width: 181px;
        min-height: 40px;
        border-radius: 8px;
        padding: 0px 3px;
      }

      .input-child-2 {
        width : 155px;
        height: 40px;
        border-radius: 4px;
      }
    }
  }

  
`

const Description = styled.div`
  color: #333333;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  .title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }

  .input-text {
    padding: 12px 14px;
    width: 642px;
    min-height: 207px;
    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    resize: none;
  }

  .description-detail {
    width: 642px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
  }
`

const Setting = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  margin-bottom: 100px;
  width: 640px;
  height: 48px;

  .container {
    padding: 32px;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;

    .title {
      display: flex;
      justify-content: center;
      background: #FEF452;
      width: 146px;
      height: 60px;
      font-weight: 700;
      font-size: 32px;
      line-height: 60px;
      color: #942F70;
    }

    .privacy-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 8px;
    }

    .tag {
      line-height: 24px;
      .title-tag {
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 2px;
      }

      .content-tag {
        color: #475467;
        font-weight: 400;
        font-size: 16px;
        margin-bottom: 28px;
      }
    }

    .tag-chosen {
      border-radius: 16px;
      background: #F9F5FF;
    }
  }

  .btn-create {
    border: 1px solid #FEF452;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    background: #FEF452;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    color: #942F70;
    font-weight: 500;
    font-size: 16px;
    min-height: 48px;
  }
`
export default function Home() {
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [check, setCheckBox] = useState(false)
  const [privacy, setPrivacy] = useState(1);
  const [address, setAddress] = useState('')
  const [capicity, setCapicity] = useState('')
  const [cost, setCost] = useState('')
  const [description, setDescription] = useState('')
  const [modalUpload, setModalUpload] = useState(false)
  const [tags, setTags] = useState([]);
  const [banner, setBanner] = useState('')
  const [detail, setDetail] = useState({})
  
  const enableButton = description !== '' && banner !== '' && cost !== '' && address !== ''

  const onChangeDate = (date, dateString) => {
    setDate(dateString)
  }

  const onChangeTime = (time, timeString) => {
    setTime(timeString)
  }

  const onChangeAddress = (e) => {
    setAddress(e.target.value)
  }

  const onChangeCapicity = (e) => {
    setCapicity(e.target.value)
  }

  const onChangeCost = (e) => {
    setCost(e.target.value)
  }

  const onChangeCheckBox = (e) => {
    setCheckBox(e.target.checked)
  }

  const onChangePrivacy = (e) => {
    setPrivacy(e.target.value);
  }


  const handleClose = (index) => {
    setTags(tags.splice(index, 1))
  }

  const openModalUpload = () => {
    setModalUpload(true)
  }

  
  const onClickBanner = (item) => {
    setBanner(item)
    setModalUpload(false)
  }

  const onChoseTag = (id) => {
    if(id===1)setTags(tags => [...tags,'Product' ]);
    if(id===2)setTags(tags => [...tags,'Marketing' ]);
    if(id===3)setTags(tags => [...tags,'Engineering' ]);
    if(id===4)setTags(tags => [...tags,'Design' ]);
  }

  const handlerCreateSocial = () => {
    createSocial()
    const response = getDetailSocial()
    setDetail(response)
  }


  return (
    <div className={styles.container}>
      <Header />
      <Container>
        {isEmpty(detail) ? (
          <>
            <Content bottom="5">
                <div className="left-side" style={{marginRight: '18px'}}>
                  <div className="title">
                    Untitle Event
                  </div>
                    <div className="child" style={{marginBottom: '28px'}}>
                        <Image 
                          src={logoDate} 
                          alt="logoDate"
                          width="34"
                          height="34"/>
                        <DatePicker onChange={onChangeDate} placeholder="Date" className="input-child"/>
                        <Image 
                          src={logoTime} 
                          alt="logoTime"
                          width="34"
                          height="34"/>
                        <DatePicker onChange={onChangeTime} picker="time" placeholder="Time" className="input-child"/>
                    </div>
                    <div className="child" style={{marginBottom: '12px'}}>
                      <Image 
                          src={logoAddress} 
                          alt="logoAddress"
                          width="17"
                          height="14"/>
                      <Input placeholder="Venue" className="" onChange={onChangeAddress} value={address}/>
                    </div>  
                    <div className="child" >
                    <Image 
                          src={logoCapicity} 
                          alt="logoCapicity"
                          width="17"
                          height="14"/>
                      <Input placeholder="Max capacity" className="input-child-2" onChange={onChangeCapicity} value={capicity}/>
                      <Image 
                          src={logoCost} 
                          alt="logoCost"
                          width="17"
                          height="14"/>
                      <Input placeholder="Cost per person" onChange={onChangeCost} className="input-child-2" value={cost}/>
                    </div>
                </div>
                <div className="right-side">
                  {banner === '' ?
                    (
                      <div className="right-child" onClick={openModalUpload}>
                        <Image 
                          src={logoBanner} 
                          alt="logo-banner"
                          width="24"
                          height="24"
                        />
                          <div className="text-banner">Add a banner</div>
                      </div>
                    ) : (
                      <div className="right-child" onClick={openModalUpload}>
                        <Image 
                          src={banner} 
                          alt="logo-live"
                          width="739"
                          height="453"
                          className="logo-banner-live"
                        />
                      </div>
                    )
                  }
                </div>
            </Content>
            <Description>
              <div className="title">
                Description
              </div>
              <TextArea
                className="input-text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description of your event.."
              />
            </Description>
            <Setting>
              <div className="container">
                  <div className="title">Settings</div>
                  <Checkbox onChange={onChangeCheckBox}>I want to approve attendees</Checkbox>
                  <div className="privacy">
                    <div className="privacy-title">Privacy</div>
                    <Radio.Group onChange={onChangePrivacy} value={privacy}>
                      <Radio value={1}>Public</Radio>
                      <Radio value={2}>Curated Audience</Radio>
                      <Radio value={3}>Community Only</Radio>
                  </Radio.Group>
                  </div>
                  <div className="tag">
                    <div className='title-tag'>Tag your social</div>
                    <div className="content-tag">Pick tags for our curation engine to work its magin</div>
                    <div>
                      {tags.length > 0 && tags.map((item, i) => (
                        <Tag className="tag-chosen" closable onClose={() => handleClose(item)} key={i}>{item}</Tag>
                      ))}
                    </div>
                      <Tag style={{marginTop: tags.length > 0 ? '18px' : 0}} onClick={() => onChoseTag(1)}>Product</Tag>
                      <Tag onClick={() => onChoseTag(2)}>Marketing</Tag>
                      <Tag onClick={() => onChoseTag(3)}>Engineering</Tag>
                      <Tag onClick={() => onChoseTag(4)} >
                        Design
                      </Tag>
                    </div>
              </div>
              <Button className="btn-create" onClick={() => handlerCreateSocial()}>Create Social</Button>
            </Setting>
          </>
          ) : (
            <>
              <Content bottom="32">
                  <div className="left-side" style={{marginRight: '18px'}}>
                    <div className="detail-title">
                      {get(detail, 'title')}
                    </div>
                      <div className="child" style={{marginBottom: '28px'}}>
                          <Image 
                            src={logoDate} 
                            alt="logoDate"
                            width="34"
                            height="34"/>
                          <div className="date-detail">
                            October 11, Wed
                          </div>
                          <Image 
                            src={logoTime} 
                            alt="logoTime"
                            width="34"
                            height="34"/>
                          <div className="date-detail">
                              7 PM
                          </div>
                      </div>
                      <div className="child" style={{marginBottom: '12px'}}>
                        <Image 
                            src={logoAddress} 
                            alt="logoAddress"
                            width="17"
                            height="14"/>
                        <div>
                          {get(detail, 'venue')}
                        </div>
                      </div>  
                      <div className="child" >
                        <Image 
                            src={logoCapicity} 
                            alt="logoCapicity"
                            width="17"
                            height="14"/>
                        <div>
                          {`${get(detail, 'capacity')} people`}
                        </div>
                        <Image 
                            src={logoCost} 
                            alt="logoCost"
                            width="17"
                            height="14"/>
                        <div>
                            {`$${get(detail, 'price')}`}
                        </div>
                      </div>
                  </div>
                  <div className="right-side">
                        <div className="right-child">
                          <Image 
                            src={get(detail, 'banner')} 
                            alt="logo-live-detail"
                            width="739"
                            height="453"
                            className="logo-banner-live"
                          />
                        </div>
                  </div>
              </Content>
              <Description>
                <div className="description-detail" dangerouslySetInnerHTML={{ __html: get(detail, 'description').replaceAll("\n", "</br>")}} />
              </Description>
            </>
          )}
          <Modal title="Choose a banner" open={modalUpload} footer={null} onCancel={() => setModalUpload(false)} centered style={{maxWidth: '1040px'}} width="1000">
          <div className="modal-banner">
            {
              arrayBanner.map((item, index) => (
                  <Image
                    className="img-banner-modal"
                    key={index}
                    onClick={() => onClickBanner(item)}
                    src={item}
                    alt={`banner ${index}`}
                    width="133"
                    height="133"
                    style={{marginRight: '8px', marginTop: '8px'}}
                  />
              ))
            }
          </div>
        </Modal>
      </Container>
    </div>
  )
}
