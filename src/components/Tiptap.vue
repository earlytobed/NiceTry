<template>
  <v-card class="mx-2">
    <div v-if="editor">
      <div class="editor-toolbar">
        <v-toolbar class="hidden-sm-and-down" flat color="grey lighten-4">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="text-none"
                width="100px"
                outlined
              >
                {{ activeType }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="name in fontTypes"
                :key="name"
                @click="editor.chain().focus().setFontFamily(name).run()"
                link
              >
                <v-list-item-title :style="{ 'font-family': name }">{{
                  name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="text-none mx-2"
                :color="fontColor"
                outlined
              >
                Color
              </v-btn>
            </template>
            <v-color-picker
              dot-size="25"
              hide-canvas
              hide-inputs
              hide-sliders
              mode="rgba"
              show-swatches
              swatches-max-height="200"
              v-model="color"
              @update:color="editor.chain().focus().setColor(colorHex).run()"
            ></v-color-picker>
          </v-menu>
          <v-divider vertical class="mx-1"></v-divider>
          <v-btn
            small
            icon
            @click="editor.chain().focus().toggleBold().run()"
            :class="{
              'v-btn--active': editor.isActive('bold'),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-bold</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{
              'v-btn--active': editor.isActive('italic'),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-italic</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().toggleStrike().run()"
            :class="{
              'v-btn--active': editor.isActive('strike'),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-strikethrough</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().toggleUnderline().run()"
            :class="{
              'v-btn--active': editor.isActive('underline'),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-underline</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().toggleCode().run()"
            :class="{
              'v-btn--active': editor.isActive('code'),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-code</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().unsetAllMarks().run()"
            class="tiptap-editor-btn"
          >
            <v-icon size="16">fa-ban</v-icon>
          </v-btn>
          <v-divider vertical class="mx-1"></v-divider>
          <v-btn
            small
            icon
            @click="editor.chain().focus().setTextAlign('left').run()"
            :class="{
              'v-btn--active': editor.isActive({ textAlign: 'left' }),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-align-left</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().setTextAlign('center').run()"
            :class="{
              'v-btn--active': editor.isActive({ textAlign: 'center' }),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-align-center</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().setTextAlign('right').run()"
            :class="{
              'v-btn--active': editor.isActive({ textAlign: 'right' }),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-align-right</v-icon>
          </v-btn>
          <v-divider vertical class="mx-1"></v-divider>
          <v-btn
            small
            icon
            @click="editor.chain().focus().setParagraph().run()"
            :class="{
              'v-btn--active': editor.isActive('paragraph'),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-paragraph</v-icon>
          </v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                small
                icon
                :class="{
                  'v-btn--active': editor.isActive('heading'),
                  'tiptap-editor-btn': true,
                }"
              >
                <v-icon size="16">fa-heading</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="editor.chain().focus().setParagraph().run()">
                <span>Paragraph</span>
              </v-list-item>
              <v-list-item
                @click="
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                "
              >
                <h1>Heading 1</h1>
              </v-list-item>
              <v-list-item
                @click="
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                "
              >
                <h2>Heading 2</h2>
              </v-list-item>
              <v-list-item
                @click="
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                "
              >
                <h3>Heading 3</h3>
              </v-list-item>
              <v-list-item
                @click="
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                "
              >
                <h4>Heading 4</h4>
              </v-list-item>
              <v-list-item
                @click="
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                "
              >
                <h5>Heading 5</h5>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            small
            icon
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{
              'v-btn--active': editor.isActive('bulletList'),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-list-ul</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{
              'v-btn--active': editor.isActive('orderedList'),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-list-ol</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{
              'v-btn--active': editor.isActive('codeBlock'),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">bi-code-square</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{
              'v-btn--active': editor.isActive('blockquote'),
              'tiptap-editor-btn': true,
            }"
          >
            <v-icon size="16">fa-quote-right</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().setHorizontalRule().run()"
            class="tiptap-editor-btn"
          >
            <v-icon size="16">fa-minus</v-icon>
          </v-btn>
          <v-divider vertical class="mx-1"></v-divider>
          <v-btn
            small
            icon
            @click="editor.chain().focus().undo().run()"
            class="tiptap-editor-btn"
          >
            <v-icon size="16">fa-undo</v-icon>
          </v-btn>
          <v-btn
            small
            icon
            @click="editor.chain().focus().redo().run()"
            class="tiptap-editor-btn"
          >
            <v-icon size="16">fa-redo</v-icon>
          </v-btn>
          <v-divider vertical class="mx-1"></v-divider>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                small
                icon
                class="tiptap-editor-btn"
              >
                <v-icon size="16">fa-image</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Add Image</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Link to image"
                        required
                        v-model="imageUrl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Alternative text (optional)"
                        v-model="imageText"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    dialog = false;
                    imageUrl = '';
                    imageText = '';
                  "
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    dialog = false;
                    addImage();
                  "
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </div>
    </div>
    <editor-content :editor="editor" class="content" />
  </v-card>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      fontTypes: ["sans-serif", "serif", "monospace"],
      colorHex: "#000000",
      dialog: false,
      imageUrl: "",
      imageText: "",
    };
  },

  computed: {
    activeType: function () {
      if (this.editor.isActive("textStyle", { fontFamily: "sans-serif" })) {
        return "sans-serif";
      } else if (this.editor.isActive("textStyle", { fontFamily: "serif" })) {
        return "serif";
      } else if (
        this.editor.isActive("textStyle", { fontFamily: "monospace" })
      ) {
        return "monospace";
      } else {
        return "sans-serif";
      }
    },
    color: {
      get() {
        return this.fontColor;
      },
      set(v) {
        this["colorHex"] = v;
      },
    },
    fontColor() {
      if (this.editor.getAttributes("textStyle").color) {
        return this.editor.getAttributes("textStyle").color;
      } else {
        return "#000000";
      }
    },
  },

  methods: {
    addImage() {
      if (this.imageUrl && this.imageText) {
        this.editor
          .chain()
          .focus()
          .setImage({ src: this.imageUrl, alt: this.imageText })
          .run();
        this.imageUrl = "";
        this.imageText = "";
      } else if (this.imageUrl) {
        this.editor.chain().focus().setImage({ src: this.imageUrl }).run();
        this.imageUrl = "";
      }
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
          types: ["heading", "paragraph"],
          alignments: ["left", "center", "right"],
          defaultAlignment: "left",
        }),
        TextStyle,
        FontFamily.configure({
          types: ["textStyle"],
        }),
        Color.configure({
          types: ["textStyle"],
        }),
        Placeholder.configure({
          emptyEditorClass: "is-editor-empty",
          placeholder: "Write torrent descriptions here...",
        }),
        Image.configure({
          inline: false,
        }),
      ],
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.editor-toolbar {
  .v-toolbar {
    display: flex;
    height: auto !important;
    padding: 5px;
    .v-toolbar__content {
      height: auto !important;
      flex-wrap: wrap;
    }
  }
}

.content {
  text-align: left;
  padding: 20px 20px;
  min-height: 180px;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.ProseMirror:focus {
  outline: none;
}

.tiptap-editor-btn {
  margin: 2px 4px;
}

img {
  max-width: 100%;
  height: auto;

  &.ProseMirror-selectednode {
    outline: 3px solid #68cef8;
  }
}
</style>
