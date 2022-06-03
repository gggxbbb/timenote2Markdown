class Timenote2Markdown {

    fileContent
    notes

    /**
     *
     * @param fileContent{Array}
     */
    constructor(fileContent) {
        this.fileContent = fileContent["tables"]
        this.notes = []
        for (const i in this.fileContent) {
            const d = this.fileContent[i]
            if (d["name"] === "note") {
                this.notes = d["data"]
            }
        }
    }

    /**
     *
     * @param target{HTMLElement}
     */
    showNotes(target) {
        const notes = this.notes
        for (const i in notes) {
            const note = notes[i]
            const noteElement = document.createElement("li")
            noteElement.innerHTML = note["title"]
            target.appendChild(noteElement)
        }
    }

    /**
     *
     * @returns {Object}
     */
    getMarkdowns() {
        const opt = {}
        this.notes.forEach(note => {
            const date = new Date(note["time"])
            const date_str = date.toISOString()
            const date_ymd = date_str.substring(0, 10)
            const name = date_ymd + " " + note["title"] + ".md"
            let content = "---\n";
            content += "title: " + note["title"] + "\n"
            content += "date: " + date_str + "\n"
            content += "---\n"
            content += note["content"]
            opt[name] = content
        })
        return opt
    }

}