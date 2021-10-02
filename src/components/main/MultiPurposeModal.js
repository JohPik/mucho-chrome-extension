import React, {useState} from 'react'
import { useTabsContext } from '../../contextTabs';

export default function MultiPurposeModal({ setIsModal }) {

    const { addBookmark } = useTabsContext();

    const [name, setName] = useState('');
    const [URL, setURL] = useState('');

    const closeModal = () => {
        setIsModal(false);
        setName('');
        setURL('');
    }

    const getFavicon = async imgUrl => {
        // const response = await fetch(`https://api.faviconkit.com/amazon.com/144`);
        // const blob = await response.blob();
        // const url = window.URL.createObjectURL(blob);
        // const image = new Image();
        // image.src = url;
        
        // console.log(image);

        fetch('https://favicongrabber.com/api/grab/amazon.com')
            .then(res => res.json())
            .then(data => console.log(data));

        // fetch(`https://s2.googleusercontent.com/s2/favicons?domain=https://amazon.com&sz=64`)
        // fetch("https://api.faviconkit.com/amazon.com/144")
        //     .then(res => console.log(res))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // close Modal
        closeModal()
        //add new shortcut
        // const image = `https://s2.googleusercontent.com/s2/favicons?domain=https://${URL}&sz=64`
        // const newLink = { tabIdx, name, URL };
        
        await getFavicon(URL);
        // addBookmark(newLink);
    };

    return (
                <div className="add__tab">
                    <div className="add__tab__wrapper">
                        <h2>Create new SOMETHING</h2>
                        
                        <form onSubmit={handleSubmit}>
                                <label>name</label>
                                <input
                                    id="bookmark-name-input"
                                    type='text'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    autoFocus
                                    autoComplete="off"
                                />

                        <label>URL</label>
                        <input
                            id="bookmark-url-input"
                            type='text'
                            value={URL}
                            onChange={e => setURL(e.target.value)}
                            autoComplete="off"
                        />

                        <div className="button__wrapper">
                            <button className="submit__button" type="submit" disabled={name.length === 0 || URL.length === 0 ? true : false}>Save</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>

                        </form>
                
                    </div>
                </div>
    )
}
