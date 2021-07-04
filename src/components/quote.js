import React from 'react'
import { useState, useEffect } from 'react'

export default function Quote() {

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const getQuote = () => {
        fetch("https://api.quotable.io/random?maxLength=70")
        .then(res => res.json())
        .then(data => {
            const { content: quote, author } = data;
            setQuote(quote);
            setAuthor(author);
        })
        .catch( err => console.error(err))
    };

    useEffect( () => {
        getQuote();
    }, [])

    return (
        <section className="quote">
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
        </section>

    )
}
