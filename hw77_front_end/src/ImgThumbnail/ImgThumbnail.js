import React from 'react';
import {apiURL} from "../constants";

const styles = {
    width: '100px',
    height: '100px',
    marginRight: '10px',
};



const ImgThumbnail = props => {
    let image = '';

    if (props.image) {
        image = apiURL + '/uploads/' + props.image;
        if (image === 'http://localhost:3005/uploads/null') {
            return null;
        }
    }

    return <img src={image} style={styles} className='img-thumbnail' alt='magic happens'/>
};

export default ImgThumbnail;