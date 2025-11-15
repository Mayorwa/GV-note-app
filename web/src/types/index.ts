import React from "react";

type LayoutProps = { children: React.ReactElement }

interface INote {
    _id?: string;
    userId?: string;
    title: string;
    content: string;
    languageCode: string;
    createdAt?: string;
    updatedAt?: string;
}


export type {LayoutProps, INote}