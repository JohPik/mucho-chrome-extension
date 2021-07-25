import React, { useState, useEffect }  from 'react';
import { useGlobalContext } from '../context';

function Block({quoteTheme}) {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const getQuote = () => {
        fetch(`https://api.quotable.io/random?maxLength=70?tags${quoteTheme}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const { content: quote, author } = data;
                setQuote(quote);
                setAuthor(author);
            })
            .catch(err => console.error(err))
    };

    useEffect(() => {
        getQuote();
    }, [])

    

    return (
        <>
            {author &&
                < figure >
                    <blockquote cite="#">
                        <p>{quote}</p>
                    </blockquote>
                    <figcaption>—{author},
                        <cite>
                            <a href="https://github.com/lukePeavey/quotable" target="_blank" rel="noopener noreferrer">
                                Quotable
                            </a>
                        </cite>
                    </figcaption>
                </figure>
            }
        </>
    )
}

export default function Quote() {
    const { settingsState } = useGlobalContext();
    const { isQuoteDisable, quoteTheme } = settingsState;

    return (
        <section className="quote">
            {!isQuoteDisable && <Block quoteTheme={quoteTheme}/>}
        </section>
    )
}