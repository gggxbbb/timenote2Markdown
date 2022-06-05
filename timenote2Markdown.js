const weatherMap = {
    104: '阴',
    150: '晴',
    250: '大风',
    350: '下雪',
    450: '下雨',
}
const moodMap = {
    "MOOD_UNKNOWN": '未知',
    "MOOD_HAPPY": '开心',
    "MOOD_SAD": '难过',
    "MOOD_ANGRY": '生气',
    "MOOD_GLOOMY": '阴沉',
    "MOOD_NORMAL": '一般',
}


class Timenote2Markdown {

    #fileContent
    #notes
    #categories

    /**
     * 构造函数
     * @param fileContent{Object} 文件内容
     */
    constructor(fileContent) {
        this.#fileContent = fileContent["tables"]
        this.#notes = []
        for (const i in this.#fileContent) {
            const d = this.#fileContent[i]
            if (d["name"] === "note") {
                this.#notes = d["data"]
            }
            if (d["name"] === "category") {
                const tempData = d["data"]
                this.#categories = {}
                for (const i in tempData) {
                    const d = tempData[i]
                    this.#categories[d["id"]] = [d["categoryName"], d["categoryDesc"]]
                }
            }
        }
    }

    /**
     *
     * @param target{HTMLElement}
     */
    showNotes(target) {
        target.innerHTML = ""
        const notes = this.#notes
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
        this.#notes.forEach(note => {
            const date = new Date(note["time"])
            const date_str = date.toISOString()
            const date_ymd = date_str.substring(0, 10)

            let category = this.#categories[note["categoryId"]]
            if (!category) {
                category = ["未分类", ""]
            }

            const fixed_content = note["content"].replace("](assets:///", "](./assets/")

            const name = date_ymd + " " + note["title"] + ".md"

            let content = "---\n";
            content += "title: " + note["title"] + "\n"
            content += "date: " + date_str + "\n"
            content += "categories: " + category[0] + "\n"
            content += "categories_desc: " + category[1] + "\n"
            content += "location: " + note["location"] + "\n"
            content += "weather: " + weatherMap[note["weather"]] + "\n"
            content += "mood: " + moodMap[note["mood"]] + "\n"
            content += "---\n"
            content += fixed_content
            opt[name] = content
        })
        return opt
    }

}