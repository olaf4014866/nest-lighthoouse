import { Controller, Get, Param } from '@nestjs/common';
import * as lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

@Controller('lighthouse')
export class LighthouseController {
  @Get(':url')
  lighthouse(@Param('url') url: string): Promise<string | void> {
    /* chromeLauncher
      .launch()
      .then(async (value: chromeLauncher.LaunchedChrome) => {
        const options = {
          logLevel: 'info',
          output: 'json',
          onlyCategories: ['performance'],
          port: value.port,
        };
        const runnerResult = await lighthouse('https://reactjs.org/', options);

        const reportJson = runnerResult.report;
        console.log(reportJson);
        value.kill();
      })
      .catch((err: any) => console.log(err)); */
    const report = this.getReport(`https://${url}`);
    // console.log(report);

    return report;
  }

  private async getReport(url: string): Promise<string | void> {
    const report = await chromeLauncher
      .launch()
      .then(async (value: chromeLauncher.LaunchedChrome) => {
        const options = {
          logLevel: 'info',
          output: 'json',
          onlyCategories: ['performance'],
          port: value.port,
        };
        const runnerResult = await lighthouse(url, options);
        // console.log(runnerResult);

        const reportJson = JSON.parse(runnerResult.report);
        value.kill();
        const audits = reportJson['audits'];
        const result = {};
        Object.keys(audits).map(
          (auditKey) => (result[auditKey] = audits[auditKey].score),
        );
        console.log(result);
        // return JSON.stringify(result);
        return JSON.stringify(result);
      })
      .catch((err: any) => console.log(err));
    return report;
  }
}
