import * as React from 'react'
import {Link} from 'react-router'
import {Breadcrumb, BreadcrumbItem, Nav, Navbar, NavbarBrand, NavItem} from 'reactstrap'

class NavBar extends React.Component {
    render() {
        const routes = ['json', 'teriyaki']

        return (
            <div>
                <Navbar color='dark' light expand='md'>
                    <NavbarBrand href='/' style={{'marginLeft': '10px'}}>{this.props.name}</NavbarBrand>
                    <Nav className='ml-auto' navbar>
                        <Breadcrumb>
                            <BreadcrumbItem><a href="#">home</a></BreadcrumbItem>
                            {
                                console.log(this.props.location)
                            }
                            <BreadcrumbItem active>food</BreadcrumbItem>
                        </Breadcrumb>
                        {routes.map(route =>
                            <NavItem>
                                <Link to={route}>{route}</Link>
                            </NavItem>)}
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavBar
