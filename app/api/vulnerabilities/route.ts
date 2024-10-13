import { NextResponse } from 'next/server';
import { mockVulnerabilities, Vulnerability } from '@/lib/mockData';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;

    // Filter vulnerabilities based on the search query
    const filteredVulnerabilities = mockVulnerabilities.filter(vuln =>
      vuln.source.toLowerCase().includes(query.toLowerCase()) ||
      vuln.language.toLowerCase().includes(query.toLowerCase()) ||
      vuln.aiSummary.toLowerCase().includes(query.toLowerCase())
    );

    // Paginate the results
    const paginatedVulnerabilities = filteredVulnerabilities.slice(offset, offset + limit);

    const totalItems = filteredVulnerabilities.length;
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      vulnerabilities: paginatedVulnerabilities,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error('Error in GET /api/vulnerabilities:', error);
    return NextResponse.json({ error: '内部服务器错误' }, { status: 500 });
  }
}
