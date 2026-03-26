import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { importGedcom } from '@/lib/services/gedcom';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'sources', 'Family_Tree_WIJA_16022025.ged');

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'File not found at ' + filePath }, { status: 404 });
        }

        const content = fs.readFileSync(filePath, 'utf-8');

        // Import using the superadmin user ID we inserted earlier
        const userId = '907a9e70-8398-43ae-b0e2-dfcc77786b38';
        const treeName = 'Test Import ' + Date.now();

        const result = await importGedcom(content, userId, treeName);

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
