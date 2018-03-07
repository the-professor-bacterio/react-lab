import React  from "react";

const Nice = ({ title, styles, children }) => (
    <div className="container">
        <div className={styles}>
            <h3>{title}</h3>
            <div style={{border :'1px dotted red'}}>
                {children}
            </div>
        </div>
    </div>
);

export default Nice;