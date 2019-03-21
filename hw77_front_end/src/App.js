import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import {addFile, changeValue, checkNewMessage, CLOSE_NOTIFICATION, getMessages, sendToServer} from "./store/actions";
import moment from "moment";
import ImgThumbnail from "./ImgThumbnail/ImgThumbnail";


class App extends Component {

    componentDidMount() {
        this.props.getMessages();
        this.interval = setInterval(() => {
            this.props.checkNew()
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    };

    showTarget = e =>{
      console.log(e.currentTarget.id);

    };

    render() {
        return (
            <div className="App">
                <form onSubmit={this.props.send}>
                    <label htmlFor="message">Message:</label>
                    <input name="message" type="text" required placeholder="Some message ..." onChange={this.props.changeValue}/>
                    <label htmlFor="author">Author:</label>
                    <input name="author" type="text" placeholder="Student" onChange={this.props.changeValue}/>
                    <label htmlFor="image">Image:</label>
                    <input name="image" type="file" onChange={this.props.addFile}/>
                    <button type="submit" id="btn-addMsg" onClick={this.props.send}>Send</button>
                </form>
                <ol id="chatBox">
                    {this.props.error !== '' ? <div className="notification" onClick={this.props.closeNotification}>{this.props.error}</div> : null}
                    {this.props.apiMessages.map((item, ndx)=>(
                        <li key={item.id} className='li' id={ndx}><div className='thumbnail_div'><ImgThumbnail image={item.image}/></div>{<div className="time_and_author_div"> <p>{moment(item.dateTime).format('llll')}</p><p>{item.author}</p></div>}<div className="message_div" onClick={this.showTarget}><p className="post_number">Click on <button id={`post #${ndx} \n ${item.message}`} onClick={this.showTarget}>post #{ndx}</button> to reply</p><p>{item.message}</p></div></li>
                    ))}
                </ol>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        author: state.author,
        message: state.message,
        apiMessages: state.apiMessages,
        error: state.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMessages:() => dispatch(getMessages()),
        changeValue: (e) => dispatch(changeValue(e)),
        addFile: (e) => dispatch(addFile(e)),
        send: (e) => dispatch(sendToServer(e)),
        checkNew: () => dispatch(checkNewMessage()),
        closeNotification: () => dispatch({type: CLOSE_NOTIFICATION})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
