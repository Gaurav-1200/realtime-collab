import React, { useCallback, useEffect, useRef } from 'react'
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
const TextEditor = () => {
    
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

    const wrapperRef =useCallback((wrapper)=>{
        if(wrapper==null)
            return;
        wrapper.innerHTML='';
        const editor = document.createElement("div");
        wrapper.append(editor);
        new Quill(editor,{theme:"snow", modules:{
            toolbar:toolbarOptions
        }});
    },[]);
    return (
        <div className="container" ref={wrapperRef}>
        k
        </div>
    )
}

export default TextEditor
