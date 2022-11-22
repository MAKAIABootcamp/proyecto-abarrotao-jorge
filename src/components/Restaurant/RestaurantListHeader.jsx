import React from 'react';
import { Carousel, DropdownButton, Dropdown, Nav } from 'react-bootstrap';
import { FcShop, FcLike } from "react-icons/fc";
import { GrLocation } from "react-icons/gr";


export const RestaurantListHeader = () => {
    return (
        <>
            <DropdownButton id="dropdown-item-button" title="82 Well St, New-York" 
                style={{ marginBottom:"2%"}}
                variant="light">
                    <Dropdown.Item><GrLocation /> 12 - 82 8th Street</Dropdown.Item>
                    <Dropdown.Item as="button"><GrLocation /> 46 - 23 8th Street </Dropdown.Item>
            </DropdownButton>

            <Carousel >
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantBanners%2Fspecial-opening-offer.png?alt=media&token=64a54426-d22a-43f0-b6d5-565676faa3e7"
                        alt="First slide" />
                    <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantBanners%2Flanding-banner-co-1.png?alt=media&token=a4cfe9d3-5a1c-4b2e-a608-a3522196febd"
                        alt="Second slide" />

                    <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantBanners%2Flanding-banner-co-2.png?alt=media&token=f1ed89e7-0abf-4669-a172-df303166488b"
                        alt="Third slide" />

                    <Carousel.Caption>
                        <h3></h3>
                        <p>
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <h4 style={{ marginTop:"2%", marginBottom:"2%"}}> Restaurants and cafes </h4>

            <Nav variant="pills" defaultActiveKey="/" >
            <Nav.Item > </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">All</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link eventKey="link-1"><FcShop /> Fast food</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link eventKey="link-2"><FcLike /> Pizza</Nav.Link>
                </Nav.Item>
            </Nav> 
        </>
    )
};
export default RestaurantListHeader;
