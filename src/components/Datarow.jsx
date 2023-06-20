
import ContentEditable from 'react-contenteditable';
import { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

export const Datarow = ({ datarow, handleData, dataOnBlur }) => {

    const [data, setData] = useState(datarow);

    const handleChange = (e, key, id) => {
        const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] }
		};

        let new_value = sanitizeHtml(e.target.value, sanitizeConf);
        handleData(key,id,new_value);
    }

    return(
    

                    <div>
                        {Object.keys(data).map((key, index) => (
                            <div className="d-flex w-100" key={index}>
                                <div className="w-50 border">{key}</div>
                                <div className="w-50 border">
                                    { key == "id" ? <div className="w-100">{ data.id }</div> :
                                    
                                      <ContentEditable
                                        onChange={(event) => handleChange(event, key,data.id)}
                                        className="w-100"
                                        html={data[key]} />  
                                    }
                                </div>
                            </div>
                        ))}
                    </div>   

    )
}