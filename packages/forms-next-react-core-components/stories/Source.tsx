import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import styled from 'styled-components'

const Source = ({code, lang}) => {
    return <SyntaxHighlighter language={lang}>{code}</SyntaxHighlighter>
}

export default Source