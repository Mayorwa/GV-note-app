import React, {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import Button from "@/components/ui/Button/Button.tsx";
import Icon from "@/components/ui/Icon.tsx";
import {getAllNotesService, deleteNoteService, createNoteService} from "@/services/"
import TextInput from "@/components/ui/Input/TextInput.tsx";
import Pagination from "@/components/ui/Pagination.tsx";
import Note from "@/components/common/Note.tsx";
import {INote} from "@/types";
import Modal from "@/components/ui/Modal.tsx";

interface IPagination {
    totalPages: number;
    currentPage: number;
    pageCount: number;
}
const BoardIndex: React.FC = () => {
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
    const [search, setSearch] = useState<string>("");
    const [notes, setNotes] = useState<INote[]>([]);
    const [createLoading, setCreateLoading] = useState(false);

    const [newNoteData, setNewNoteData] = useState<INote>({
        title: "",
        content: "",
        languageCode: ""
    });

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()) ||
        note.languageCode.toLowerCase().includes(search.toLowerCase())
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")));

    const [pagination, setPagination] = useState<IPagination>({
        totalPages: 1,
        currentPage: 1,
        pageCount: 1,
    });
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const switchPage = (action: string) => {
        if (action === "decr") {
            setPage((prev) => prev - 1);
        }
        else{
            setPage((prev) => prev + 1);
        }
    }

    const isFormValid = newNoteData.title.trim() !== "" && newNoteData.languageCode.trim() !== "" && newNoteData.content.trim() !== "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewNoteData((prev) => ({ ...prev, [name]: value }));
    };
    const createNoteModal = {
        body: <>
            <h2 className="text-2xl mb-4">Create Note</h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className=" font-medium text-gray-900">Title</label>
                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        value={newNoteData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        inputClasses="mt-2"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="">Language</label>
                    {/* @ts-ignore*/}
                    <select id="languageCode" name="languageCode" className="field__input mt-2" onChange={handleChange}>
                        <option value="" selected>Select Language</option>
                        {( languages.map((l, i) => (<option value={l.code} key={i}>{l.name}</option>)))}
                    </select>
                </div>
                <div>
                    <label htmlFor="content" className="">Content</label>
                    {/* @ts-ignore*/}
                    <textarea id="content" name="content" rows="4" className="field__input mt-2" value={newNoteData.content} onChange={handleChange}></textarea>
                </div>

            </div>
            <p className="description"></p>
        </>,
        footer: <>
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setCreateModalOpen(false)} btnClass='w-full mr-4' size='md'>
                    Cancel
                </Button>
                <Button loading={createLoading} disabled={!isFormValid} btnClass='w-full bg-red' onClick={() => createNote()} size='md'>
                    Create Note
                </Button>
            </div>
        </>
    }

    const editNote = (id: string, data: any) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === id ? { ...note, ...data } : note
            )
        );
    }
    const deleteNote = (id: string) => {
        deleteNoteService(id).then(() => {
            getNotes();
        }).catch(() => {
            console.log('Delete Unsuccessful')
        });
    }
    const createNote = () => {
        setCreateLoading(true);
        createNoteService(newNoteData).then(() => {
            setCreateLoading(false);
            getNotes();
            setNewNoteData({
                title: "",
                content: "",
                languageCode: ""
            });
            setCreateModalOpen(false)
        }).catch(() => {
            setCreateLoading(false);
            console.log('Create Unsuccessful')
            setCreateModalOpen(false)
        });
    }
    const getNotes = () => {
        setSearchParams({ page: page.toString() });
        getAllNotesService(page).then((res) => {
            const apiNotes = res.data || [];
            setNotes(apiNotes);
            setPagination((prev) => ({
                ...prev,
                totalPages: res.meta.totalPages ?? prev.totalPages,
                currentPage: res.meta.currentPage ?? prev.currentPage,
                pageCount: res.meta.pageCount ?? prev.pageCount,
            }));

        }).catch(() => {
            console.log('An error occured')
        });
    }
    useEffect(() => {
        getNotes();
    }, [page]);

    return (
        <>
            <TextInput
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes"
                inputClasses="mb-4"
            />
            <div className="flex justify-between">
                <h2 className="text-2xl flex items-center">
                    <Icon name="notes" width="23px" height="23px"/>
                    <span className="ml-2">Notes</span>
                </h2>
                {
                    filteredNotes.length > 0 &&
                    <Button
                        size="md"
                        btnClass="w-fit"
                        name="nextButton"
                        onClick={() => setCreateModalOpen(true)}
                    >
                        <Icon name="note-add" width="18px" height="18px"/>
                        <span className="ms-3">Create Notes</span>
                    </Button>
                }
            </div>
            <section className={`grid gap-4 mt-6 ${filteredNotes.length > 0 && "lg:grid-cols-4"}`}>
                {filteredNotes.length === 0 ? (
                    <>
                        <div className="text-center">No notes yet.</div>
                        <Button
                            size="md"
                            btnClass="w-fit mx-auto"
                            name="create Note"
                            onClick={() => setCreateModalOpen(true)}
                        >
                            <Icon name="note-add" width="18px" height="18px"/>
                            <span className="ms-3">Create Notes</span>
                        </Button>
                    </>
                ) : (
                    filteredNotes.map((note) => (
                        <Note
                            note={note}
                            key={note._id}
                            triggerDeleteNote={(id) => deleteNote(id)}
                            triggerEditNote={(id, data) => editNote(id, data)}
                        />
                        )
                    ))
                }
            </section>
            <Pagination
                currentPage={pagination?.currentPage}
                totalPages={pagination?.totalPages}
                onSwitchPage={switchPage}
            />
            <Modal body={createNoteModal.body}
                   footer={createNoteModal.footer}
                   open={isCreateModalOpen}
                   onClose={() => setCreateModalOpen(false)}/>
        </>
    )
}

export default BoardIndex