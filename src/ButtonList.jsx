import { Link } from "react-router-dom";
import { ButtonListItem } from "./ButtonListItem";
import { useState } from "react";

export function ButtonList({listItems, emptyString, path }) {
    return (
        <>
            <Link 
                to={path + "/new"}
                className="btn btn-header"
            >New</Link>
            <ul className="list">
                {listItems.length === 0 && emptyString}
                {listItems.map(t => {
                    return (
                        <ButtonListItem
                            {...t}
                            key={t.id}
                            path={path}
                        />
                    );
                })}
            </ul>
        </>
    );
}