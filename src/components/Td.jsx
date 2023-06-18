import ContentEditable from 'react-contenteditable';
import { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import React from 'react';

export const Td = ({ singledata, index }) => {

    useEffect(() => {
        console.log(singledata);
    }, [singledata]);

	const onContentChange = (e) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] }
		};

		//handleData(e, sanitizeHtml(e.currentTarget.innerHTML, sanitizeConf))
	};


    return (  

 
            
                <td>
                 <ContentEditable
                    onChange={onContentChange}
                    onBlur={onContentChange}
                    html={singledata.id.toString()} />  
                </td>
    )
            
        
}