import styled from 'styled-components'
import { get } from 'lodash'
import logo from '../../public/header-logo.svg'
import Icon from './Icon'
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Image from 'next/image'
import Link from 'next/link'
import Menu from 'antd/lib/menu'
import Dropdown from 'antd/lib/dropdown'

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 60px;
  padding: 0 112px;
  .header-body{
    width: ${props => get(props, 'minWidth', 1920)}px;
    margin: 0 auto;
       .ant-row{
         display: flex;
         align-items: center;
         img{
           &:hover{
            cursor: pointer;
           }
         }
         ul{
          padding: 0;
          display: flex; 
          justify-content: flex-end;
          margin-bottom: 0;
          flex-wrap: wrap;
        li{
          list-style-type: none;
          margin-left: 48px;
          a{
            color: #000000;
            &:hover {
              text-decoration: none;
              color: #0060C4;
            }
          }
        }
      }
       }
  }
`

const StyledMenu = styled(Menu)`
  margin-top: -16px;

  .sub-menu-item {
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;

    & > a {
      color: black;
    }
  }
`

const LinkNormalStyled = styled.a`
  font-size: 14px;
  font-weight: 500;
`;

const MenuItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 14px;
  font-weight: 500;
`

const GroupItem = styled.li`
  min-height: 60px;
  display: flex;
  align-items: center;
`;

const Header =  ({ className, minWidth, }) => {
    const items = [
        {
            label: 'Blog',
            type: 'NORMAL'
        },
        {
            label: 'Socials',
            type: 'NORMAL'
        },
        {
            label: 'Past Socials',
            type: 'NORMAL'
        },
        {
            label: 'Clubs',
            type: 'DROPDOWN',
            children: [
                {
                  label: 'Club 1',
                  url: 'https://www.google.com.vn/?hl=vi',
                  target: '_blank',
                },
                {
                  label: 'Club 2',
                  url: 'https://www.google.com.vn/?hl=en',
                  target: '_blank',
                },
              ],
        },
        {
            label: 'Contact',
            type: 'NORMAL'
        }
    ]
    return (
        <Container className={`${className} header-container`} minWidth={minWidth}>
        <div className="header-body">
            <Row>
                <Col md={4}>
                    <div className="logo">
                    <Link href='/'>
                        <Image
                            src={logo}
                            alt="logo"
                            width="148"
                            height="33"
                        />
                    </Link>
                    </div>
                </Col>

                <Col md={20}>
                    <ul>
                    {items.map((item, index) => {
                        switch (item.type) {
                            case 'NORMAL':
                                return (
                                    <GroupItem
                                        key={index}
                                        className="menu-group-item"
                                        style={{ minHeight: '60px' }}
                                        >
                                        <LinkNormalStyled>
                                            {item.label}
                                        </LinkNormalStyled>
                                    </GroupItem>
                                )
                            case 'DROPDOWN':
                                const dropdownMenuContent = (
                                    <StyledMenu items={get(items,'children')} />
                                )
                                return (
                                    <Dropdown
                                        key={index}
                                        overlay={dropdownMenuContent}
                                        trigger={['click']}
                                    >
                                        <GroupItem
                                            className="menu-group-item"
                                            style={{ minHeight: '60px' }}
                                        >
                                            <MenuItem as="a">
                                            {item.label}

                                            <Icon
                                                iconName="arrow_drop_down"
                                                iconType="outlined"
                                                iconClass="dropdown-icon"
                                                size="xs"
                                            />
                                            </MenuItem>
                                        </GroupItem>
                                    </Dropdown>
                                )
                            }
                        })
                    }
                    </ul>
                </Col>
            </Row>
        </div>
        </Container>
    );
}

export default Header