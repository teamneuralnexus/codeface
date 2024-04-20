<script setup>
definePageMeta({
    layout: 'main'
})

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const pageNumber = ref(0)
const textRefs = ref([])
const loading = ref(false)
const boiler1 = ref(null)
const boiler2 = ref(null)
const htmlCode = ref(``)
const user = useUser()
if (user.value == null) {
    await navigateTo('/auth/login')
}

const data = reactive([{
    pageNumber: 0,
    pageName: "Home",
    sections: [{
        sectionNumber: 0,
        sectionHistory: [
            {
                version: 0,
                html: ``,
                prompt: ``
            }
        ] 

    }]
}])

const executeSection = async (sn) => {
    const sectionPrompt = textRefs.value[sn]
    loading.value = true
    const x = data[pageNumber.value].sections[sn].sectionHistory
    const length = x.length
    x[length-1].prompt = sectionPrompt
    console.log(x[x.length-1])
    const result = await $fetch('/api/completions/code', {
        method: 'POST',
        body: {
            "prompt": sectionPrompt,
            "history": x[x.length-1].version>0 ? x : -1
        }
    })
    x[length-1].html = "<!--"+ sn +"-->" + result + "<!--"+ sn +"-->"
    if(length>19) {
        x.shift()
    }
    x.push({
        version: length,
        prompt: ``,
        html: ``
    })
    if( x[length-1].version==0) {
        htmlCode.value += "<!--"+ sn +"-->" + result + "<!--"+ sn +"-->"
    }
    else {
        console.log(htmlCode.value)
        htmlCode.value = htmlCode.value.replace(x[length-2].html, "<!--"+ sn +"-->" + result + "<!--"+ sn +"-->")
        console.log(htmlCode.value)
    }
    loading.value = false
}

const addSection = () => {
    console.log(data[pageNumber.value].sections.length)
    data[pageNumber.value].sections.push({
        sectionNumber: data[pageNumber.value].sections.length,
        sectionHistory: [
            {
                version: 0,
                html: ``,
                prompt: ``
            }
        ] 

    })
    console.log(data)
}

const logout = async () => {
    $fetch('/api/auth/logout', {
        method: 'POST'
    }).then(async () => {
        await navigateTo('/auth/login')
    })
}

onMounted(async () => {
    const user = useUser()
    if (user.value == null) {
        await navigateTo('/auth/login')
    }

    boiler1.value = "<!doctypehtml><meta charset=UTF-8><meta content='width=device-width,initial-scale=1'name=viewport><script src='https://cdn.tailwindcss.com'> <\/script><body>"
    boiler2.value = "</body></html>"
})
</script>
<template>
    <div>
        <div class="my-10 font-[Roboto]">
            <div class="grid grid-cols-[30%_70%] p-5 gap-x-2">
                <!-- <div class="bg-white"></div> -->
                <div  class="bg-white border-2 border-neutral-300">
                    <template v-for="d in data[pageNumber].sections">
                        <div class=" grid grid-cols-[10%_90%] border-b-2 border-neutral-300" draggable="true">
                            <div @click="executeSection(d.sectionNumber)" class="bg-cyan-500 text-white text-center pt-3 text-xl cursor-pointer">
                               OK
                            </div>
                            <div class="w-full p-2 bg-gradient-to-r from-cyan-500 to-blue-500 ">
                                <textarea v-model="textRefs[d.sectionNumber]" @input="(e)=>e.target.style.height = e.target.scrollHeight + 'px'" rows="1" ref="textarea" class="min-h-10 shadow-lg rounded-lg w-full px-2 p-1 focus:outline-none" placeholder="Enter a description eg a 3 column navbar"/>
                            </div>
                        </div>
                    </template>
                    <div @click="addSection" class="border-dashed border-2 border-black mt-2  text-gray-500 text-center py-3 cursor-pointer">
                        Add another section
                    </div>
                    
                </div>
                <div class="p-5 pt-0 bg-gray-200 rounded-lg">
                    <h1 class="text-lg text-center mb-5 rounded-t-lg text-black bg-blue-300 -mx-5">Website Preview <Icon v-if="loading" name="line-md:loading-loop" class="text-blue-500"/></h1>
                    <!-- <ClientOnly> -->
                        <a :href="`data:text/html,${encodeURIComponent(boiler1+htmlCode+boiler2)}`" download="your-file-name.html">Download HTML</a>
                        <splitpanes class="default-theme  rounded-lg" :push-other-panes="false" style="height: 600px" >
                            <pane class="!bg-gray-200" size="0">
                                <span></span>
                            </pane>
                            <pane class="!bg-gray-100 rounded-lg" size="100" min-size="40">
                                <!-- <div v-html="boiler1+htmlCode+boiler2">
                                </div> -->
                                <iframe class="w-full h-full"  sandbox="allow-popups allow-scripts"
                                :srcdoc="boiler1+htmlCode+boiler2">
                                </iframe>
                            </pane>
                            <pane class="!bg-gray-200" size="0">
                                <span></span>
                            </pane>
                        </splitpanes>
                    <!-- </ClientOnly> -->
                </div>
            </div>
        </div>
        Inside APPP
        {{ data }}
        <br />
        <button @click="logout" class="bg-black text-white mb-10">Log out</button>
    </div>
</template>
<style>
.splitpanes__splitter {
    border-left: 0px !important;
    width: 0px !important;
}
</style>