import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import {cubesImage} from "../../../components-utils";
import "./ArtPage.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@mui/material/Button";
import MenuDetails from "./MenuDetails";
import {useSelector} from "react-redux";
import Client from "../../../../services/GameService"

const theme = createTheme();

function ArtPage({user, uploadImagesFunc}) {
    const MySwal = withReactContent(Swal);
    const gameState = useSelector((state) => state.gameReducer);

    const handleSolved = (selectedImage) => {
        if (selectedImage) {
            selectedImage.classList.add("image-solved");
        }
        MySwal.close();
    };

    const actionCaptureHandler = async (response) => {
        await Client.uploadImages({action: response.target.id})
    }


    const handleImageClick = (response) => {
        const clickedImage = response.target;
        MySwal.fire({
            title: "Solver",
            html: (
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Box sx={{display: "inline-block", marginBottom: "10px"}}>
                        <Button
                            variant="contained"
                            onClick={handleUploadImageClick}
                        >
                            Upload cube images to solve
                        </Button>
                    </Box>
                    <Box sx={{display: "inline-block"}}>
                        <Button
                            variant="contained"
                            onClick={handleSolved(clickedImage)}
                        >
                            Mark as solved
                        </Button>
                    </Box>
                </Box>

            ),
            imageUrl: response.target.src,
            imageHeight: 90,
            confirmButtonColor: "#50b7f5",
            showCloseButton: true,
            showCancelButton: true,
        });
    };

    // Define a function that will handle the upload image button click event
    const handleUploadImageClick = () => {
        // Show a popup dialog using SweetAlert2 library
        MySwal.fire({
            title: "Upload cube images to solve",
            // HTML content to be displayed inside the dialog
            html: (
                <div>
                    <label htmlFor="top">Top:</label>
                    <button id="top" onClick={actionCaptureHandler}>Capture</button>
                    <br/>

                    <label htmlFor="bottom">Bottom:</label>
                    <button id="bottom" onClick={actionCaptureHandler}>Capture</button>
                    <br/>

                    <label htmlFor="front">Front:</label>
                    <button id="front" onClick={actionCaptureHandler}>Capture</button>
                    <br/>

                    <label htmlFor="back">Back:</label>
                    <button id="back" onClick={actionCaptureHandler}>Capture</button>
                    <br/>

                    <label htmlFor="left">Left:</label>
                    <button id="left" onClick={actionCaptureHandler}>Capture</button>
                    <br/>

                    <label htmlFor="right">Right:</label>
                    <button id="right" onClick={actionCaptureHandler}>Capture</button>
                    <br/>

                    <button id="clear" onClick={actionCaptureHandler}>Clear</button>
                    <br/>

                    <button id="confirm" onClick={actionCaptureHandler}>Confirm</button>
                    <br/>
                </div>
            ),
            // Button color for the confirmation button
            confirmButtonColor: "#50b7f5",
            // Whether to show a close button in the dialog
            showCloseButton: true,
            // Whether to show a cancel button in the dialog
            showCancelButton: true,
            // Whether to focus on the confirmation button by default
            focusConfirm: false,
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" flexDirection="row" sx={{marginTop: 1}}>
                <MenuDetails gameState={gameState}/>
                <ImageList
                    sx={{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        width: 693, // 990 * 0.7
                        height: 567, // 810 * 0.7
                    }}
                    cols={30}
                    gap={0.5}
                >
                    {cubesImage.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={item.img}
                                alt={item.title}
                                loading="lazy"
                                className={'zoom'}
                                onClick={handleImageClick}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </ThemeProvider>
    );
}

export default ArtPage;
