import Note from "../models/schemas/note";
import NoteTranslation from "../models/schemas/noteTranslation";
import { ErrorObject } from "utility-belt-390";

class TranslationService {

    static async translate(noteId: string, targetLanguageCode: string) {
        const note = await Note.findById(noteId);
        if (!note) throw new ErrorObject(404, "error", "Note not found");

        const translatedText = this.mockTranslate(note.content, targetLanguageCode);

        let translation = await NoteTranslation.findOne({
            noteId,
            targetLanguageCode,
        });

        if (translation) {
            translation.text = translatedText;
        } else {
            translation = new NoteTranslation({
                noteId,
                targetLanguageCode,
                text: translatedText,
            });
        }

        return await translation.save();
    }

    private static mockTranslate(text: string, lang: string): string {
        const dictionary: Record<string, Record<string, string>> = {
            hello: { fr: "bonjour", es: "hola", de: "hallo", it: "ciao" },
            world: { fr: "monde", es: "mundo", de: "welt", it: "mondo" },
            note: { fr: "note", es: "nota", de: "notiz", it: "nota" },
        };

        return text
                .split(" ")
                .map((word) => {
                    const lower = word.toLowerCase();
                    return dictionary[lower]?.[lang] || word;
                })
                .join(" ");
    }

    static async getTranslations(noteId: string) {
        const note = await Note.findById(noteId);
        if (!note) throw new ErrorObject(404, "error", "Note not found");

        const translations = await NoteTranslation.find({ noteId })
            .sort({ createdAt: -1 })  // latest first
            .lean();
    }
}

export default TranslationService;