import React from "react";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

const PaginationPage = () => {
    return (
        <MDBRow>
            <MDBCol>
                <h4 className="title my-5 text-left">Bootstrap MDBPagination</h4>
                <MDBPagination circle>
                    <MDBPageItem disabled>
                        <MDBPageNav className="page-link">
                            <span>First</span>
                        </MDBPageNav>
                    </MDBPageItem>
                    <MDBPageItem disabled>
                        <MDBPageNav className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </MDBPageNav>
                    </MDBPageItem>
                    <MDBPageItem active>
                        <MDBPageNav className="page-link">
                            1 <span className="sr-only">(current)</span>
                        </MDBPageNav>
                    </MDBPageItem>
                    <MDBPageItem>
                        <MDBPageNav className={`http://localhost:3000/produk/search_result?keyword=${'aa'}&page=${1}&category=${'a'}`}>
                            2
                        </MDBPageNav>
                    </MDBPageItem>
                    <MDBPageItem>
                        <MDBPageNav className="page-link">
                            3
                        </MDBPageNav>
                    </MDBPageItem>
                    <MDBPageItem>
                        <MDBPageNav className="page-link">
                            4
                        </MDBPageNav>
                    </MDBPageItem>
                    <MDBPageItem>
                        <MDBPageNav className="page-link">
                            5
                        </MDBPageNav>
                    </MDBPageItem>
                    <MDBPageItem>
                        <MDBPageNav className="page-link">
                            &raquo;
                        </MDBPageNav>
                    </MDBPageItem>
                    <MDBPageItem>
                        <MDBPageNav className="page-link">
                            Last
                        </MDBPageNav>
                    </MDBPageItem>
                </MDBPagination>
            </MDBCol>
        </MDBRow>
    )
}

export default PaginationPage;








// // render produk with pagination
//     // ==============================
//     renderpagination = () => {
//         const { dataProduk, currentProduk, currentPage, totalPages, searchfield } = this.state;
//         var showproduct = currentProduk
//         // console.log(currentProduk)
//         var filterProduct = dataProduk.filter(val => {
//             return val.namaproduk.toLowerCase().includes(searchfield.toLowerCase())
//         })
//         console.log('TOTAL PAGES', totalPages)

//         let length = dataProduk.length
//         if (searchfield.length) {
//             showproduct = filterProduct
//             length = showproduct.length
//         }
//         if (dataProduk.length === 0) return null;

//         const headerClass = [
//             "text-dark py-2 pr-4 m-0",
//             currentPage ? "border-gray border-right" : ""
//         ]
//             .join(" ")
//             .trim();

//         // tab pagination
//         return (
//             <div className="container mb-5">
//                 <div className="row d-flex flex-row ">
//                     <div className="w-100 px-4  d-flex flex-row flex-wrap align-items-center justify-content-between paginatios">
//                         <div className="d-flex flex-row align-items-center">
//                             <h6 className={headerClass}>
//                                 <strong className="text-secondary">
//                                     {length}
//                                 </strong>{" "}
//                                 Product
// 							</h6>
//                             {currentPage && (
//                                 <span className="current-page d-inline-block h-100 pl-4 text-secondary">
//                                     Page {' '}
//                                     <span className="font-weight-bold">
//                                         {currentPage}
//                                     </span>
//                                     /
//                                     <span className="font-weight-bold">
//                                         {totalPages}
//                                     </span>
//                                 </span>
//                             )}
//                         </div>
//                         <div className="d-flex flex-row py-4 align-items-center">
//                             <Pagination
//                                 totalRecords={length}
//                                 pageLimit={9}
//                                 pageNeighbours={0}
//                                 onPageChanged={this.onPageChanged}
//                             />
//                         </div>
//                     </div>

//                     {/* ----- render produk ----- */}
//                     {
//                         showproduct.length < 1 ?
//                             <div className="text-center mx-auto w-100 font-weight-bold" style={{ color: 'grey', fontSize: '20px' }}>Product not found<br />
//                                 Please try other or more general keywords</div>
//                             :
//                             showproduct.map((val, index) => {
//                                 const discount = showproduct[index].diskon
//                                 const harganormal = showproduct[index].harganormal
//                                 const hargadiskon = 'Rp.' + Numeral(harganormal - Math.round(harganormal * discount / 100)).format('0,0.00')
//                                 return (
//                                     <Fade key={index} bottom cascade>
//                                         <div key={index} className="grid">
//                                             <figure className="effect-winston">
//                                                 <img src={`${APIURLimagetoko}` + val.image} alt="image" />
//                                                 <button className="btn mx-auto p-0"
//                                                     style={
//                                                         {
//                                                             zIndex: 1,
//                                                             cursor: 'text',
//                                                             position: "absolute",
//                                                             top: -6,
//                                                             right: 0,
//                                                             borderRadius: "0px 0px 0px 30px",
//                                                             fontSize: "18px",
//                                                             fontWeight: "bolder",
//                                                             lineHeight: '17px',
//                                                             height: "14%",
//                                                             width: "23%",
//                                                             color: "black",
//                                                             backgroundColor: "#ADFF2F"
//                                                         }
//                                                     }> {discount}%
//                                                     </button>
//                                                 <figcaption>
//                                                     <h5>{val.namakategori}</h5>
//                                                     <h4>{val.namaproduk} - {hargadiskon}</h4>
//                                                     <h6> <MdRestaurant />{val.namatoko}</h6>
//                                                     <p>
//                                                         <Link to={'/detailproduk/' + val.id}>
//                                                             <Tooltip TransitionComponent={Zoom} title="detail or buy" arrow placement="top">
//                                                                 <i className="fa fa-shopping-cart" ></i>
//                                                             </Tooltip>
//                                                         </Link>
//                                                         {
//                                                             this.props.roleid === 1 ?
//                                                                 <Tooltip TransitionComponent={Zoom} title="add wishlist" arrow placement="top">
//                                                                     <a className="wishlist" onClick={() => this.addToWishList(index)} ><i className="fa fa-fw fa-heart"></i></a>
//                                                                 </Tooltip> :
//                                                                 <Tooltip TransitionComponent={Zoom} title="You must login first" arrow placement="top">
//                                                                     <a className="wishlist" ><i className="fa fa-fw fa-heart"></i></a>
//                                                                 </Tooltip>
//                                                         }
//                                                     </p>
//                                                 </figcaption>
//                                             </figure>

//                                         </div>
//                                     </Fade>
//                                 )
//                             }
//                             )}
//                 </div>
//             </div>
//         )
//     }
