#!/bin/bash
# Build a combined training corpus from ALL 1,331 skills
# This creates a single file that Claude Code can read to train on everything

SKILLS_DIR=".agents/skills/antigravity-awesome-skills/skills"
OUTPUT_DIR=".agents/skills/antigravity-awesome-skills/data"
CORPUS_FILE="$OUTPUT_DIR/training-corpus.md"

echo "Building training corpus from ALL skills..."

# Start the corpus file
cat > "$CORPUS_FILE" << 'HEADER'
# Complete Antigravity Awesome Skills Training Corpus
# Auto-generated from ALL 1,331+ SKILL.md files
# Read this file to absorb every skill in the ecosystem

HEADER

count=0
total=$(find "$SKILLS_DIR" -name "SKILL.md" | wc -l)

# Process every SKILL.md file
find "$SKILLS_DIR" -name "SKILL.md" -type f | sort | while read skill_file; do
    count=$((count + 1))
    skill_name=$(echo "$skill_file" | sed "s|$SKILLS_DIR/||" | sed 's|/SKILL.md||')

    echo "---" >> "$CORPUS_FILE"
    echo "## SKILL: $skill_name" >> "$CORPUS_FILE"
    echo "" >> "$CORPUS_FILE"
    cat "$skill_file" >> "$CORPUS_FILE"
    echo "" >> "$CORPUS_FILE"
    echo "" >> "$CORPUS_FILE"

    # Progress every 100 skills
    if [ $((count % 100)) -eq 0 ]; then
        echo "  Processed $count / $total skills..."
    fi
done

# Get final stats
lines=$(wc -l < "$CORPUS_FILE")
size=$(du -h "$CORPUS_FILE" | cut -f1)

echo ""
echo "=== CORPUS BUILT ==="
echo "File: $CORPUS_FILE"
echo "Skills: $total"
echo "Lines: $lines"
echo "Size: $size"
echo "===================="
