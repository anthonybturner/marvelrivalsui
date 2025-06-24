
export interface ICompleteNewsDashboard {
  patches: IPatchNotes[];
  balances: IBalances[];
  diaries: IDevDiaries[];
  versions: IGameVersions[];
  maps: IMaps[];
}

export interface INew{
    id: string,
    name: string,
    description: string,
    image: string
}
export interface INews{
    id: string,
    name: string,
    description: string,
    image: string
}


export interface IPatchNotes{
    total_patches: number,
    formatted_patches:[
        id: string,
        title: string,
        date: string,
        overview: string,
        fullContent: string,
        imagePath: string        

    ]
}

export interface IBalances{
    total_balances: number,
    balances:[
        id: string,
        title: string,
        date: string,
        overview: string,
        fullContent: string,
        imagePath: string        
    ]
}

export interface IDevDiaries{
    total_entries: number,
    dev_diaries:[
        id: string,
        title: string,
        date: string,
        overview: string,
        fullContent: string,
        imagePath: string        
    ]
}
export interface IMaps{
    total_maps: number,
    maps:[
        id: string,
        name: string,
        full_name: string,
        location: string,
        description: string,
        game_mode: string,
        is_competitive: boolean,
        sub_map:{
            id: number,
            name: any,
            thumbnail: any
        },
        video:string,
        images:string[]        
    ]
}

export interface IGameVersions{
    total_versions: number,
    versions:[
        version: number,
        release: string,
        patchNotesUrl: string,
    ]
}