import React from 'react'

const Icons = ({setContent, content}) => {
    const reactions = [   
        '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
        '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
        '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
    ]

    return (
        <div className="nav-item dropdown" 
        style={{ opacity: 1}}>
            
            <span id="navbarDropdown" style={{position: 'relative', padding: '4px'}}
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span style={{opacity: 0.4}}>😄</span>
            </span>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', textAlign: 'center', cursor: 'pointer'}}>
                    {
                        reactions.map(icon => (
                            <span style={{margin: '3px 0'}} key={icon} onClick={() => setContent(content + icon)}>
                                {icon}
                            </span>
                        ))
                    }
                </div>
            </div>
                
        </div>
    )
}

export default Icons
