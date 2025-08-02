# AI Content Detector & Humanizer

A powerful Next.js application that detects AI-generated content and provides humanized versions with detailed analysis and suggestions.

## Features

- **AI Content Detection**: Advanced algorithms to identify AI-generated text
- **Text Humanization**: Convert AI-like text to more natural, human-sounding content
- **File Upload Support**: Upload .txt, .pdf, .doc, .docx files for analysis
- **Real-time Analysis**: Instant results with confidence scores
- **Detailed Reports**: Comprehensive analysis with suggestions for improvement
- **Export Functionality**: Download analysis reports as text files
- **Modern UI**: Beautiful, responsive design with smooth animations

## Best NPM Packages Used

### Core Dependencies
- **Next.js 15.4.5**: React framework for production
- **React 19.1.0**: UI library
- **TypeScript**: Type safety and better development experience

### UI & UX Packages
- **react-dropzone**: Drag-and-drop file upload functionality
- **react-hot-toast**: Beautiful toast notifications
- **lucide-react**: Modern, customizable icons
- **Tailwind CSS**: Utility-first CSS framework

### Recommended Additional Packages for Production

For even better functionality, consider these packages:

#### AI Detection & NLP
```bash
npm install natural compromise compromise-numbers
```
- **natural**: Natural language processing library
- **compromise**: Lightweight NLP library
- **compromise-numbers**: Number processing for NLP

#### Advanced Text Analysis
```bash
npm install text-statistics readability
```
- **text-statistics**: Calculate text readability scores
- **readability**: Automated readability assessment

#### File Processing
```bash
npm install pdf-parse mammoth
```
- **pdf-parse**: Extract text from PDF files
- **mammoth**: Convert .docx files to HTML/text

#### Enhanced UI Components
```bash
npm install @headlessui/react @heroicons/react framer-motion
```
- **@headlessui/react**: Accessible UI components
- **@heroicons/react**: Beautiful icons
- **framer-motion**: Smooth animations

#### Charts & Visualization
```bash
npm install recharts
```
- **recharts**: Beautiful charts for analysis visualization

#### Form Handling
```bash
npm install react-hook-form zod
```
- **react-hook-form**: Performant forms with validation
- **zod**: TypeScript-first schema validation

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai_detector
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Text Input
1. Navigate to `/check-content`
2. Select "Text Input" tab
3. Enter text (40-2000 characters)
4. Click "Analyze Content"
5. View results with AI score, humanized text, and suggestions

### File Upload
1. Select "File Upload" tab
2. Drag and drop or click to select a file
3. Supported formats: .txt, .pdf, .doc, .docx
4. File content will be loaded into the text area
5. Click "Analyze Content" to process

## API Endpoints

### POST /api/analyze
Analyzes text for AI detection and returns humanized version.

**Request Body:**
```json
{
  "text": "Your text to analyze (40-2000 characters)"
}
```

**Response:**
```json
{
  "originalText": "Original input text",
  "humanizedText": "Humanized version",
  "aiScore": 75.5,
  "humanScore": 24.5,
  "confidence": 92.3,
  "suggestions": ["Suggestion 1", "Suggestion 2"],
  "isAIGenerated": true,
  "analysisDetails": {
    "repetitionScore": 22.5,
    "complexityScore": 18.8,
    "formalityScore": 18.8,
    "coherenceScore": 15.0
  }
}
```

## AI Detection Algorithm

The application uses multiple indicators to detect AI-generated content:

### 1. Repetitive Phrases
- Detects overuse of transitional phrases
- Identifies repetitive sentence structures
- Flags common AI writing patterns

### 2. Formal Vocabulary
- Analyzes use of technical/formal words
- Detects overly academic language
- Identifies unnatural word choices

### 3. Sentence Structure
- Checks sentence length variation
- Analyzes complexity patterns
- Identifies uniform writing style

### 4. Natural Language Indicators
- Personal pronouns reduce AI score
- Contractions indicate human writing
- Informal language patterns

## Humanization Process

The humanization algorithm:

1. **Replaces formal words** with simpler alternatives
2. **Simplifies complex phrases** to natural language
3. **Maintains meaning** while improving readability
4. **Adds natural variations** to sentence structure

## Project Structure

```
ai_detector/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # AI analysis API
│   ├── check-content/
│   │   └── page.tsx              # Main analysis page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── public/                       # Static assets
├── package.json                  # Dependencies
└── README.md                     # Documentation
```

## Development

### Adding New Features

1. **Enhanced AI Detection**: Integrate machine learning models
2. **Multiple Language Support**: Add language detection and analysis
3. **Batch Processing**: Analyze multiple files at once
4. **Advanced Humanization**: Use GPT or other AI models for better humanization
5. **User Accounts**: Save analysis history and preferences

### Performance Optimization

1. **Caching**: Implement Redis for API response caching
2. **CDN**: Use CDN for static assets
3. **Image Optimization**: Optimize images with Next.js Image component
4. **Code Splitting**: Implement dynamic imports for better loading

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
- **Netlify**: Connect GitHub repository
- **Railway**: Deploy with database support
- **AWS**: Use Amplify or EC2

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or issues:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Note**: This application provides educational and analytical purposes. The AI detection accuracy depends on the algorithms used and may not be 100% accurate for all cases.
