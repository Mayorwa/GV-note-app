import React, {useEffect, useState} from "react";
import Icon from "@/components/ui/Icon.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import {INote} from "@/types";
import Modal from "@/components/ui/Modal.tsx";
import TextInput from "@/components/ui/Input/TextInput.tsx";
import {editNoteService, getNoteDetailService} from "@/services";

interface NoteProps {
    note: INote;
    triggerDeleteNote: (id: string) => void;
    triggerEditNote: (id: string, data: any) => void;
}

interface ISingleNote extends INote {
    summary: any,
    translation: any[]
}

const Note: React.FC<NoteProps> = ({note, triggerDeleteNote, triggerEditNote}) => {
    const languages = [
        {
            code: "en",
            name: "English",
        }, {
            code: "fr",
            name: "French",
        },
        {
            code: "it",
            name: "Italian",
        },
        {
            code: "es",
            name: "Spanish",
        },
    ];
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [deleting] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const [singleNote, setSingleNote] = useState<ISingleNote>({
        title: note.title,
        content: note.content,
        languageCode: note.languageCode,
        summary: {},
        translation: []
    });

    const [editNoteData, setEditNoteData] = useState<INote>({
        title: note.title,
        content: note.content,
        languageCode: note.languageCode
    });

    const editNote = () => {
        setEditLoading(true);
        {/*@ts-ignore*/}
        editNoteService(note?._id, editNoteData).then((data) => {
            setEditLoading(false);
            {/*@ts-ignore*/}
            triggerEditNote(note?._id, data)
            setEditModalOpen(false)
        }).catch(() => {
            setEditLoading(false);
            console.log('Edit Unsuccessful')
            setEditModalOpen(false)
        });
    }

    useEffect(() => {
        if (isViewModalOpen) {
            setLoading(true);
            {/*@ts-ignore*/}
            getNoteDetailService(note?._id).then((data) => {
                setSingleNote(data)
                setLoading(false);
            }).catch(() => {
                setLoading(false);
                console.log('Get Note Unsuccessful')
            });
        }
    }, [isViewModalOpen]);

    const isFormValid = editNoteData.title.trim() !== "" && editNoteData.languageCode.trim() !== "" && editNoteData.content.trim() !== "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditNoteData((prev) => ({ ...prev, [name]: value }));
    };

    const viewNoteModal = {
        body: <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="relative justify-between lg:row-span-2 bg-white">
                    <h2 className="text-2xl pb-1 mb-3 border-b border-dashed border-gray-400">
                        {singleNote.title}
                        <span className="text-sm ml-2">{singleNote.languageCode}</span>
                    </h2>
                    <div>
                        {singleNote.content}
                        {(
                            <div className="border-t border-dashed border-gray-400">

                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <div>
                            {/*@ts-ignore*/}
                            <p>{new Date(singleNote?.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}</p>
                        </div>
                    </div>
                </div>
            )}
        </>,
        footer: <></>
    }

    const editNoteModal = {
        body: <>
            <h2 className="text-2xl mb-4">Edit Note</h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className=" font-medium text-gray-900">Title</label>
                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        value={editNoteData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        inputClasses="mt-2"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="">Language</label>
                    {/*@ts-ignore*/}
                    <select id="languageCode" name="languageCode" className="field__input mt-2" onChange={handleChange} value={editNoteData.languageCode}>
                        <option value="">Select Language</option>
                        {( languages.map((l, i) => (<option value={l.code} key={i}>{l.name}</option>)))}
                    </select>
                </div>
                <div>
                    <label htmlFor="content" className="">Content</label>
                    {/*@ts-ignore*/}
                    <textarea id="content" name="content" rows="4" className="field__input mt-2" value={editNoteData.content} onChange={handleChange}></textarea>
                </div>

            </div>
            <p className="description"></p>
        </>,
        footer: <>
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setEditModalOpen(false)} btnClass='w-full mr-4' size='md'>
                    Cancel
                </Button>
                <Button loading={editLoading} disabled={!isFormValid} btnClass='w-full bg-red' onClick={() => editNote()} size='md'>
                    Edit Note
                </Button>
            </div>
        </>
    }

    const deleteNoteModal = {
        body: <>
            <h2 className="text-2xl mb-4">Delete Note</h2>
            <p className="description">Are you sure you want to delete the note <b>“{note?.title}”</b>?</p>
        </>,
        footer: <>
            <div className="flex items-center justify-between">
                <Button variant="outline"
                        onClick={() => setDeleteModalOpen(false)}
                        btnClass='w-full mr-4'
                        size='md'>
                    Cancel
                </Button>
                <Button loading={deleting}
                        disabled={false}
                        btnClass='w-full bg-red'
                        onClick={() => {
                            setDeleteModalOpen(false);
                            {/*@ts-ignore*/}
                            triggerDeleteNote(note?._id)
                        }}
                        size='md'>
                    Delete
                </Button>
            </div>
        </>
    }
    return (
        <>
            <div className="relative justify-between lg:row-span-2 border border-solid border-gray-40 py-2 px-5 bg-white">
                <h2 className="text-2xl pb-1 mb-3 border-b border-dashed border-gray-400">
                    {note.title}
                    <span className="text-sm ml-2">{note.languageCode}</span>
                </h2>
                <div className="min-h-[5rem]">
                    <p>{note?.content.slice(0, 150)}{note?.content.length > 150 ? "..." : ""}</p>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div>
                        {/*@ts-ignore*/}
                        <p>{new Date(note?.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </p>
                    </div>
                    <div className="flex">
                        <span className="mr-3" onClick={() => setViewModalOpen(true)}>
                            <Icon name="maximize" className="cursor-pointer" width="14px" height="14px"/>
                        </span>
                        <span className="mr-3 text-blue-500" onClick={() => setEditModalOpen(true)}>
                            <Icon name="edit" className="cursor-pointer" width="16px" height="16px"/>
                        </span>
                        <span className="text-red-500" onClick={() => setDeleteModalOpen(true)}>
                            <Icon name="delete" className="cursor-pointer" width="16px" height="16px"/>
                        </span>
                    </div>

                </div>
            </div>

            <Modal body={editNoteModal.body}
                   footer={editNoteModal.footer}
                   open={isEditModalOpen}
                   onClose={() => setEditModalOpen(false)}/>

            <Modal body={viewNoteModal.body}
                   footer={viewNoteModal.footer}
                   open={isViewModalOpen}
                   onClose={() => setViewModalOpen(false)}/>

            <Modal body={deleteNoteModal.body}
                   footer={deleteNoteModal.footer}
                   open={isDeleteModalOpen}
                   onClose={() => setDeleteModalOpen(false)}/>
        </>
    )
}

export default Note;