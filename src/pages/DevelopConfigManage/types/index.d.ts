import React from "react";

export interface ITreeDataProps {
    title: string;
    key: any;
    children?: ITreeDataProps[]
}
